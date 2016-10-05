package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.PayWay;
import com.shouyou.ims.service.PayWayService;
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
@RequestMapping(value = "/ims/payWay")
public class PayWayController {
    @Autowired
    private PayWayService payWayService;

    @RequestMapping(value = "/findList",method = RequestMethod.POST)
    public String findList(PayWay payWay){
        return new ResultBo<>(1,payWayService.findList(payWay)).toString();
    }

    @RequestMapping(value = "/findById",method = RequestMethod.GET)
    public String findById(String id){
        return new ResultBo<>(1,payWayService.findById(id)).toString();
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(PayWay payWay){
        return new ResultBo<>(payWayService.save(payWay)).toString();
    }

    @RequestMapping(value = "/delete")
    public String delete(String id){
        return new ResultBo<>(payWayService.delete(id)).toString();
    }

    @RequestMapping(value = "/deleteMul")
    public String deleteMul(@RequestParam("ids[]") List<String> ids){
        return new ResultBo<>(payWayService.deleteMul(ids)).toString();
    }
}
