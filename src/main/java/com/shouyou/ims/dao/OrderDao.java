package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.Order;
import com.sun.org.apache.xpath.internal.operations.Or;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Administrator on 2016/5/15.
 */
@Mapper
public interface OrderDao extends BaseDao<Order> {
    Order findByOrderNo(@Param("orderNo")String orderNo);
    int insertBatch(@Param("list") List<Order> list);
    int updateBatch(@Param("list") List<Order> list);
}
