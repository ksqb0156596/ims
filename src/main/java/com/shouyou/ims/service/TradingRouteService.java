package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.dao.TradingRouteDao;
import com.shouyou.ims.entity.TradingRoute;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by makun on 2016/5/24.
 */
@Service
public class TradingRouteService {

    @Autowired
    private TradingRouteDao tradingRouteDao;

    public PageInfo<TradingRoute> findList(TradingRoute tradingRoute){
        PageHelper.startPage(tradingRoute.getPageNum(), tradingRoute.getPageSize());
        return new PageInfo<>(tradingRouteDao.findList(tradingRoute));
    }

    public TradingRoute findById(String id){
        return tradingRouteDao.findById(id);
    }

    public int save(TradingRoute tradingRoute){
        if(StringUtils.isEmpty(tradingRoute.getId())){
            tradingRoute.preInsert();
            return tradingRouteDao.insert(tradingRoute);
        }
        tradingRoute.preUpdate();
        return tradingRouteDao.update(tradingRoute);
    }

    public int delete(TradingRoute tradingRoute){
        return tradingRouteDao.delete(tradingRoute);
    }
}
