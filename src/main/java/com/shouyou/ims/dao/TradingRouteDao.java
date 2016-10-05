package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.TradingRoute;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Administrator on 2016/5/14.
 */
@Mapper
public interface TradingRouteDao extends BaseDao<TradingRoute>{
    List<TradingRoute> findByName(@Param("name")String name);
}
