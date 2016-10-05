package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.bo.OrderExcelBo;
import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.*;
import com.shouyou.ims.entity.*;
import com.shouyou.ims.util.ExcelUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by Administrator on 2016/7/17.
 */
@Service
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

    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssSS");
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

                if(order.getRechargeType() == 0 && StringUtils.isEmpty(order.getAccountId())){
                    Account account = new Account();
                    account.setName(order.getAccountName());
                    account.setPassword(order.getAccountPwd());
                    account.setClientId(order.getClientId());
                    accountService.save(account);
                    order.setAccountId(account.getId());
                }
                order.setOrderNo(genOrderNo());
                int totalMoney = client.getTotalMoney() + order.getTradingPrice().intValue();
                client.setTotalMoney(totalMoney);
                client.setLevelId(levelDao.queryLevel(totalMoney));
                clientService.save(client);
                return this.insert(order);
            }else{
                Order order1 = orderDao.findById(order.getId());
                int plus = order.getTradingPrice().subtract(order1.getTradingPrice()).intValue();
                int totalMoney;
                if(order.getStatus() == 3333 || order.getStatus() == 9999){
                    totalMoney = client.getTotalMoney() - order.getTradingPrice().intValue();
                }else{
                    totalMoney = client.getTotalMoney() + order.getTradingPrice().intValue() + plus;
                }
                client.setTotalMoney(totalMoney);
                client.setLevelId(levelDao.queryLevel(totalMoney));
                clientService.save(client);
                return this.update(order);
            }
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

    public int delete(Order order){

        return orderDao.delete(order.getId());
    }


    public ResultBo upload(MultipartFile multipartFile){
        ResultBo resultBo = new ResultBo();
        List<OrderExcelBo> list = ExcelUtils.parseExcel(multipartFile,new OrderExcelBo());
        List<Order> orderList = new ArrayList<>();
        int i = 1;
        BigDecimal ten = new BigDecimal(10);
        try {


        for(OrderExcelBo orderExcelBo : list){
            Order order = new Order();
            if(StringUtils.isEmpty(orderExcelBo.getOrderNo())){
                order.setOrderNo(genOrderNo());
            }else{
                order = orderDao.findByOrderNo(orderExcelBo.getOrderNo());
            }
            //校验游戏
            if(StringUtils.isEmpty(orderExcelBo.getGameName())){
                resultBo.setStatus(0);
                resultBo.setMsg("第" + i + "行" + "游戏名称不能为空");
                return resultBo;
            }
            List<Game> gameList = gameDao.findByName(orderExcelBo.getGameName());
            if(gameList.size() == 0 || gameList.size() > 1){
                resultBo.setStatus(0);
                resultBo.setMsg("第" + i + "行" + "数据库不存在或存在多个相同游戏名的游戏，请检查");
                return resultBo;
            }
            order.setGameId(gameList.get(0).getId());
            //校验平台
            if(StringUtils.isEmpty(orderExcelBo.getPlatformName())){
                resultBo.setStatus(0);
                resultBo.setMsg("第" + i + "行" + "平台名称不能为空");
                return resultBo;
            }
            List<GamePlatform> gamePlatformList = gamePlatformDao.findByName(orderExcelBo.getPlatformName());
            if(gamePlatformList.size() == 0 || gamePlatformList.size() > 1){
                resultBo.setStatus(0);
                resultBo.setMsg("第" + i + "行" + "数据库不存在或存在多个相同平台名的平台，请检查");
                return resultBo;
            }
            order.setPlatformId(gamePlatformList.get(0).getId());

            //校验客户
            if(StringUtils.isEmpty(orderExcelBo.getAliWang()) && StringUtils.isEmpty(orderExcelBo.getQq())
                    && StringUtils.isEmpty(orderExcelBo.getWechat())
                    && StringUtils.isEmpty(orderExcelBo.getPhone())){
                resultBo.setStatus(0);
                resultBo.setMsg("第" + i + "行" + "客户联系方式至少有一个不能为空");
                return resultBo;
            }
            Client client = new Client();
            try {
                client.setWechat(String.valueOf(Integer.parseInt(orderExcelBo.getWechat())));
            }catch (Exception e){
                client.setWechat(orderExcelBo.getWechat());
            }
            try {
                client.setQq(String.valueOf(Integer.parseInt(orderExcelBo.getQq())));
            }catch (Exception e){
                client.setQq(orderExcelBo.getQq());
            }
            try {
                client.setAliWang(String.valueOf(Integer.parseInt(orderExcelBo.getAliWang())));
            }catch (Exception e){
                client.setAliWang(orderExcelBo.getAliWang());
            }
            try {
                client.setPhone(String.valueOf(Integer.parseInt(orderExcelBo.getPhone())));
            }catch (Exception e){
                client.setPhone(orderExcelBo.getPhone());
            }
            if(StringUtils.isEmpty(orderExcelBo.getClientBelongId())){
                client.setUserId(orderExcelBo.getClientBelongId());
            }else{
                client.setUserId(UserUtils.getUser().getId());
            }
            client = clientService.save(client).getResult();
            order.setClientId(client.getId());
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
            Account account = new Account();
            account.setName(orderExcelBo.getAccountName());
            account.setPlatformId(order.getPlatformId());
            account.setGameId(order.getGameId());
            List<Account> accountList = accountService.findAccount(account);
            if(accountList.size() > 1){
                resultBo.setStatus(0);
                resultBo.setMsg("第" + i + "行" + "数据库中存在多个相同账号");
                return resultBo;
            }
            if(accountList.size() == 0){
                account.setClientId(order.getClientId());
                account.setPassword(orderExcelBo.getAccountPwd());
                accountService.save(account);
                order.setAccountId(account.getId());
            }else {
                order.setAccountId(accountList.get(0).getId());
            }
            //校验交易方式
            if(StringUtils.isEmpty(orderExcelBo.getTradingName())) {
                resultBo.setStatus(0);
                resultBo.setMsg("第" + i + "行" + "交易方式不能为空");
                return resultBo;
            }
            List<TradingRoute> tradingRouteList = tradingRouteDao.findByName(orderExcelBo.getTradingName());
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
            discount = discountService.queryDiscount(discount);
            if(discount == null){
                resultBo.setStatus(0);
                resultBo.setMsg("第" + i + "行" + "折扣不存在");
                return resultBo;
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
            this.save(order);
            i++;
        }
            return new ResultBo(1);
        }catch (Exception e){
            return new ResultBo(0,e.getMessage());
        }

    }

    private String genOrderNo(){
        return "SY"+simpleDateFormat.format(new Date());
    }

}
