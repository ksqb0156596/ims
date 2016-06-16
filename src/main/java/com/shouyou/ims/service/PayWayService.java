package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.dao.PayWayDao;
import com.shouyou.ims.entity.PayWay;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by makun on 2016/5/24.
 */
@Service
public class PayWayService {

    @Autowired
    private PayWayDao payWayDao;

    public PageInfo<PayWay> findList(PayWay payWay){
        PageHelper.startPage(payWay.getPageNum(),payWay.getPageSize());
        return new PageInfo<PayWay>(payWayDao.findList(payWay));
    }

    public PayWay findById(String id){
        return payWayDao.findById(id);
    }

    public int save(PayWay payWay){
        if(StringUtils.isEmpty(payWay.getId())){
            payWay.preInsert();
            return payWayDao.insert(payWay);
        }
        payWay.preUpdate();
        return payWayDao.update(payWay);
    }
}
