package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.DiscountDao;
import com.shouyou.ims.entity.Discount;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/7/19.
 */
@Service
public class DiscountService {
    @Autowired
    private DiscountDao discountDao;

    public PageInfo<Discount> findList(Discount discount){
        PageHelper.startPage(discount.getPageNum(),discount.getPageSize());
        return new PageInfo<>(discountDao.findList(discount));
    }

    public Discount queryDiscount(Discount discount){
        return discountDao.queryDiscount(discount);
    }

    public int save(Discount discount){
        if(!StringUtils.isEmpty(discount.getId())){
            this.delete(discount.getId());
        }
        discount.preInsert();
        return discountDao.insert(discount);
    }

    public int delete(String id){
        return discountDao.delete(id);
    }
    public int deleteMul(List<String> ids){
        return discountDao.deleteMul(ids, UserUtils.getUser().getId());
    }
}
