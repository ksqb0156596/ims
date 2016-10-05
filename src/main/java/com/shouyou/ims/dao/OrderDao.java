package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2016/5/15.
 */
@Mapper
public interface OrderDao extends BaseDao<Order> {
    Order findByOrderNo(@Param("orderNo")String orderNo);
}
