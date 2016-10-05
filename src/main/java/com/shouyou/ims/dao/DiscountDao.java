package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.Discount;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2016/5/14.
 */
@Mapper
public interface DiscountDao extends BaseDao<Discount>{
    Discount queryDiscount(Discount discount);
}
