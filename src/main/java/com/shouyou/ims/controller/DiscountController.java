package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.Discount;
import com.shouyou.ims.service.DiscountService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2016/7/20.
 */
@RestController
@RequestMapping(value = "/ims/discount")
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @RequestMapping(value = "/findList")
    public String findList(Discount discount){
        return new ResultBo<>(1,discountService.findList(discount)).toString();
    }

    @RequestMapping(value = "/queryDiscount",method = RequestMethod.GET)
    public ResultBo queryDiscount(Discount discount){
        discount = discountService.queryDiscount(discount);
        if(discount == null){
            return new ResultBo<>(0);
        }else{
            return new ResultBo<>(1,discount);
        }
    }


    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(Discount discount){
        return new ResultBo<>(discountService.save(discount)).toString();
    }

    @RequestMapping(value = "/deleteMul",method = RequestMethod.POST)
    public String delete(@RequestParam("ids[]") List<String> ids){
        return new ResultBo<>(discountService.deleteMul(ids)).toString();
    }
}
