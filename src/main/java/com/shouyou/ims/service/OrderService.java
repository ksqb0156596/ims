package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.bo.OrderExcelBo;
import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.commons.CacheUtils;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.*;
import com.shouyou.ims.entity.*;
import com.shouyou.ims.util.DateUtils;
import com.shouyou.ims.util.ExcelUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by Administrator on 2016/7/17.
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = RuntimeException.class)
public class OrderService {
    @Autowired
    private OrderDao orderDao;
    @Autowired
    private LevelDao levelDao;
    @Autowired
    private GameDao gameDao;
    @Autowired
    private GamePlatformDao gamePlatformDao;
    @Autowired
    private TradingRouteDao tradingRouteDao;
    @Autowired
    private AccountService accountService;
    @Autowired
    private DiscountService discountService;

    @Autowired
    private ClientService clientService;

    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
    Lock lock = new ReentrantLock();

    public PageInfo<Order> findList(Order order){
//    public List<Order> findList(Order order){
        PageHelper.startPage(order.getPageNum(),order.getPageSize());
        return new PageInfo<>(orderDao.findList(order));
//        return orderDao.findList(order);
    }

    public Order findById(String id){
        return orderDao.findById(id);
    }

    public int save(Order order){
        try {
            lock.lock();
            Client client = clientService.findById(order.getClientId());

            if(StringUtils.isEmpty(order.getId())){
                order.setOrderNo(genOrderNo());
                if(order.getRechargeType() == 0 && StringUtils.isEmpty(order.getAccountId())){
                    Account account = new Account();
                    account.setName(order.getAccountName());
                    account.setPassword(order.getAccountPwd());
                    account.setClientId(order.getClientId());
                    account.setGameId(order.getGameId());
                    account.setPlatformId(order.getPlatformId());
                    account.setUserId(order.getClientBelongId());
                    accountService.save(account);
                    order.setAccountId(account.getId());
                }
                if(client != null){//历史数据
                    int totalMoney = client.getTotalMoney() + order.getTradingPrice().intValue();
                    client.setTotalMoney(totalMoney);
                    client.setLevelId(levelDao.queryLevel(totalMoney));
                    clientService.save(client);
                }

                return this.insert(order);
            }else{
                Order order1 = orderDao.findById(order.getId());
                if(!order1.getCreateUserId().equals(UserUtils.getUser().getId()) && !"admin".equals(UserUtils.getUser().getId())){//除了admin其他用户不能修改别人的订单信息
                    return 9000;
                }
                if(client != null) {//历史数据
                    int plus = order.getTradingPrice().subtract(order1.getTradingPrice()).intValue();
                    int totalMoney;
                    if (order.getStatus() == 3333 || order.getStatus() == 9999) {
                        totalMoney = client.getTotalMoney() - order.getTradingPrice().intValue();
                    } else {
                        totalMoney = client.getTotalMoney() + order.getTradingPrice().intValue() + plus;
                    }
                    client.setTotalMoney(totalMoney);
                    client.setLevelId(levelDao.queryLevel(totalMoney));
                    clientService.save(client);
                }
                Account account = accountService.findById(order.getAccountId());
                account.setUserId(order.getClientBelongId());
                accountService.save(account);
                return this.update(order);
            }
        }catch (Exception e){
            throw new RuntimeException();
        }finally {
            lock.unlock();
        }

    }

    public int insert(Order order){
        order.preInsert();
        return orderDao.insert(order);
    }

    public int update(Order order){
        order.preUpdate();
        return orderDao.update(order);
    }

    public int delete(String id){

        return orderDao.delete(id);
    }

    public ResultBo upload(MultipartFile multipartFile){
        ResultBo resultBo = new ResultBo();
        List<Order> orderList = new ArrayList<>();
        int i = 1;
        BigDecimal ten = new BigDecimal(10);
        try {
            List<OrderExcelBo> list = ExcelUtils.parseExcel(multipartFile,new OrderExcelBo());
            if(list == null){
                resultBo.setStatus(0);
                resultBo.setMsg("导入格式不正确");
                return resultBo;
            }
            List<Order> insertList = new ArrayList<>();
            List<Order> updateList = new ArrayList<>();


            for(OrderExcelBo orderExcelBo : list){
                Order order = new Order();
                if(StringUtils.isBlank(orderExcelBo.getOrderNo())){
                    order.setOrderNo(genOrderNo());
                }else{
                    order = orderDao.findByOrderNo(orderExcelBo.getOrderNo());
                    if(order == null){
                        resultBo.setStatus(0);
                        resultBo.setMsg("第" + i + "行" + "订单号不存在");
                        return resultBo;
                    }
                }
                //校验游戏
                if(StringUtils.isEmpty(orderExcelBo.getGameName())){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "游戏名称不能为空");
                    return resultBo;
                }
                List<Game> gameList;
                if(CacheUtils.get(orderExcelBo.getGameName()) != null){
                    gameList = (List<Game>) CacheUtils.get(orderExcelBo.getGameName());
                }else{
                    gameList = gameDao.findByName(orderExcelBo.getGameName());
                    if(gameList.size() == 0 || gameList.size() > 1){
                        resultBo.setStatus(0);
                        resultBo.setMsg("第" + i + "行" + "数据库不存在或存在多个相同游戏名的游戏，请检查");
                        return resultBo;
                    }
                    CacheUtils.put(orderExcelBo.getGameName(),gameList);
                }

                order.setGameId(gameList.get(0).getId());
                //校验平台
                if(StringUtils.isEmpty(orderExcelBo.getPlatformName())){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "平台名称不能为空");
                    return resultBo;
                }
                List<GamePlatform> gamePlatformList;
                if(CacheUtils.get(orderExcelBo.getPlatformName()) != null){
                    gamePlatformList = (List<GamePlatform>) CacheUtils.get(orderExcelBo.getPlatformName());
                }else{
                    gamePlatformList = gamePlatformDao.findByName(orderExcelBo.getPlatformName());
                    if(gamePlatformList.size() == 0 || gamePlatformList.size() > 1){
                        resultBo.setStatus(0);
                        resultBo.setMsg("第" + i + "行" + "数据库不存在或存在多个相同平台名的平台，请检查");
                        return resultBo;
                    }
                    CacheUtils.put(orderExcelBo.getPlatformName(),gamePlatformList);
                }

                order.setPlatformId(gamePlatformList.get(0).getId());


                //校验充值类型
                if(StringUtils.isEmpty(orderExcelBo.getRechargeType())){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "充值类型不能为空");
                    return resultBo;
                }else{
                    if ("首充".equals(orderExcelBo.getRechargeType())){
                        order.setRechargeType(0);
                    }else if("续充".equals(orderExcelBo.getRechargeType())){
                        order.setRechargeType(1);
                    }else{
                        resultBo.setStatus(0);
                        resultBo.setMsg("第" + i + "行" + "充值类型不符合规范");
                        return resultBo;
                    }
                }

                //校验账号
                if(StringUtils.isEmpty(orderExcelBo.getAccountName())){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "账号名称不能为空");
                    return resultBo;
                }
                boolean clientFlag = true;
                Account account = new Account();
                account.setName(orderExcelBo.getAccountName());
                account.setPlatformId(order.getPlatformId());
                account.setGameId(order.getGameId());
                String key = "account_" + account.getName();
                if(order.getRechargeType() == 1) {
                    List<Account> accountList;
                    if (CacheUtils.get(key) != null) {
                        accountList = (List<Account>) CacheUtils.get(key);
                    } else {
                        accountList = accountService.findListByName(orderExcelBo.getAccountName());
                        if (accountList.size() > 0)
                            CacheUtils.put(key, accountList);
                    }
                    if (accountList.size() > 0) {
                        order.setAccountId(accountList.get(0).getId());
                        if (StringUtils.isNotEmpty(account.getClientId())) {
                            clientFlag = false;
                            order.setClientId(account.getClientId());
                        }
                    }
                }
                if(clientFlag){//用户不存在处理
                    String clientId = getClientId(orderExcelBo);
                    if("".equals(clientId)){
                        resultBo.setStatus(0);
                        resultBo.setMsg("第" + i + "行" + "存在多个用户，请继续完善用户信息");
                        return resultBo;
                    }
                    account.setClientId(clientId);
                    order.setClientId(clientId);
                    account.setPassword(orderExcelBo.getAccountPwd());
                    if(StringUtils.isNotEmpty(orderExcelBo.getClientBelongId())){
                        account.setUserId(orderExcelBo.getClientBelongId());
                    }else{
                        account.setUserId(UserUtils.getUser().getId());
                    }
                    if(StringUtils.isNotEmpty(order.getAccountId())){
                        account.setId(order.getAccountId());
                    }
                    accountService.save(account);
                    order.setAccountId(account.getId());

                }
                //校验交易方式
                if(StringUtils.isEmpty(orderExcelBo.getTradingName())) {
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "交易方式不能为空");
                    return resultBo;
                }
                List<TradingRoute> tradingRouteList;
                if(CacheUtils.get(orderExcelBo.getTradingName()) != null){
                    tradingRouteList = (List<TradingRoute>) CacheUtils.get(orderExcelBo.getTradingName());
                }else{
                    tradingRouteList = tradingRouteDao.findByName(orderExcelBo.getTradingName());
                    if(tradingRouteList.size() > 0)
                        CacheUtils.put(orderExcelBo.getTradingName(),tradingRouteList);
                }
                if(tradingRouteList.size() == 0 || tradingRouteList.size() > 1){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "数据库中交易方式不存在或存在多个相同的交易方式");
                    return resultBo;
                }
                order.setTradingId(tradingRouteList.get(0).getId());
                //校验折扣
                Discount discount = new Discount();
                discount.setPlatformId(order.getPlatformId());
                discount.setRechargeType(order.getRechargeType());
                discount.setGameId(order.getGameId());

                key = discount.getPlatformId() + discount.getRechargeType() + discount.getGameId();
                if(CacheUtils.get(key) != null){
                    discount = (Discount) CacheUtils.get(key);
                }else{
                    discount = discountService.queryDiscount(discount);
                    if(discount == null){
                        resultBo.setStatus(0);
                        resultBo.setMsg("第" + i + "行" + "折扣不存在");
                        return resultBo;
                    }
                    CacheUtils.put(key,discount);
                }
                if(StringUtils.isEmpty(orderExcelBo.getPoint())){
                    order.setPoint(new BigDecimal(discount.getPoint()));
                }else{
                    order.setPoint(new BigDecimal(orderExcelBo.getPoint()));
                }
                order.setRealPoint(new BigDecimal(discount.getRealPoint()));
                if(StringUtils.isEmpty(orderExcelBo.getDenomination())){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "面额不能为空");
                    return resultBo;
                }
                order.setDenomination(orderExcelBo.getDenomination());
                BigDecimal denominate;
                try {
                    denominate = new BigDecimal(order.getDenomination());
                }catch (Exception e){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "面额必须为数字");
                    return resultBo;
                }

                if(StringUtils.isEmpty(orderExcelBo.getTradingPrice())) {
                    order.setTradingPrice(denominate.multiply(order.getPoint()).divide(ten).setScale(0,BigDecimal.ROUND_CEILING));
                }else{
                    order.setTradingPrice(new BigDecimal(orderExcelBo.getTradingPrice()));
                }
                order.setProductionPrice(denominate.multiply(order.getRealPoint()).divide(ten).setScale(0, BigDecimal.ROUND_CEILING));
                order.setProfit(order.getTradingPrice().subtract(order.getProductionPrice()));
                //充值处理人
                if(StringUtils.isEmpty(orderExcelBo.getDirectorId())){
                    order.setDirectorId(UserUtils.getUser().getId());
                }else{
                    order.setDirectorId(orderExcelBo.getDirectorId());
                }
                //订单状态
                if(StringUtils.isEmpty(orderExcelBo.getStatus())){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "订单状态不能为空");
                    return resultBo;
                }
                try {
                    order.setStatus(Integer.parseInt(orderExcelBo.getStatus()));
                }catch (Exception e){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "订单状态不正确");
                    return resultBo;
                }
                if(orderExcelBo.getOrderDate() == null){
                    resultBo.setStatus(0);
                    resultBo.setMsg("第" + i + "行" + "订单日期不能为空或格式不正确");
                    return resultBo;
                }
                order.setOrderDate(orderExcelBo.getOrderDate());
                if(StringUtils.isEmpty(order.getId())){
                    order.preInsert();
                    insertList.add(order);
                }else{
                    order.preUpdate();
                    updateList.add(order);
                }

                i++;
                if(updateList.size() == 500){
                    orderDao.updateBatch(updateList);
                    updateList = new ArrayList<>();
                }
                if(insertList.size() == 500){
                    orderDao.insertBatch(insertList);
                    insertList = new ArrayList<>();
                }
            }
            if(updateList.size() > 0){
                orderDao.updateBatch(updateList);
            }
            if(insertList.size() > 0){
                orderDao.insertBatch(insertList);
            }
            return new ResultBo(1);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
    }

    private String genOrderNo(){
        return "SY"+simpleDateFormat.format(new Date()) + new Random().nextInt(90) +10;
    }

    //如果客户信息不存在组织客户信息
    private String getClientId(OrderExcelBo orderExcelBo){
        Client client = new Client();
        //temp : 历史订单没有客户信息
        if(StringUtils.isEmpty(orderExcelBo.getClientName())
                && StringUtils.isEmpty(orderExcelBo.getWechat()) &&
                StringUtils.isEmpty(orderExcelBo.getQq()) &&
                StringUtils.isEmpty(orderExcelBo.getAliWang()) &&
                StringUtils.isEmpty(orderExcelBo.getPhone())
                ){
            return null;
        }

        client.setName(orderExcelBo.getClientName());
        try {
            client.setWechat(String.valueOf(Integer.parseInt(orderExcelBo.getWechat())));
        } catch (Exception e) {
            client.setWechat(orderExcelBo.getWechat());
        }
        try {
            client.setQq(String.valueOf(Integer.parseInt(orderExcelBo.getQq())));
        } catch (Exception e) {
            client.setQq(orderExcelBo.getQq());
        }
        try {
            client.setAliWang(String.valueOf(Integer.parseInt(orderExcelBo.getAliWang())));
        } catch (Exception e) {
            client.setAliWang(orderExcelBo.getAliWang());
        }
        try {
            client.setPhone(String.valueOf(Integer.parseInt(orderExcelBo.getPhone())));
        } catch (Exception e) {
            client.setPhone(orderExcelBo.getPhone());
        }
        ResultBo<Client> resultBo = clientService.save(client);
        if(resultBo.getStatus() == 2){
            return "";
        }
        client = resultBo.getResult();
        return client.getId();
    }

    public void exportOrder(Order order){
        order.setPageNum(1);
        order.setPageSize(0);
        PageInfo<Order> pageInfo = this.findList(order);
        List<Order> list = pageInfo.getList();
        for(Order order1 : list){
            int status = order1.getStatus();
            switch (status){
                case 1 : order1.setStatusName("待付款");break;
                case 2 : order1.setStatusName("待充值");break;
                case 3 : order1.setStatusName("待收货");break;
                case 4 : order1.setStatusName("交易完成");break;
                case 5 : order1.setStatusName("已评价");break;
                case 3333 : order1.setStatusName("已退款");break;
                case 9999 : order1.setStatusName("已取消");break;
            }
        }
        try {
            RequestAttributes ra = RequestContextHolder.getRequestAttributes();
            ServletRequestAttributes sra = (ServletRequestAttributes) ra;
            HttpServletRequest request = sra.getRequest();
            HttpServletResponse response = sra.getResponse();
            String path = request.getSession().getServletContext().getRealPath("/");
            response.setContentType("multipart/form-data");
            InputStream is = new FileInputStream(path + "WEB-INF/classes/static/files/exportOrder.xls");
            response.addHeader("Content-Disposition", "attachment;fileName=order"+DateUtils.format(new Date())+".xls");
            ExcelUtils.exportExcel(is,list,response);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }
}
