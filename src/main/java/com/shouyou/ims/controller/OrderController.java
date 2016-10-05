package com.shouyou.ims.controller;

import com.alibaba.fastjson.JSON;
import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.Order;
import com.shouyou.ims.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by Administrator on 2016/7/18.
 */
@RestController
@RequestMapping(value = "/ims/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/findList",method = RequestMethod.GET)
    public String findList(Order order){
        return new ResultBo(1,orderService.findList(order)).toString();
    }

    @RequestMapping(value = "/findById")
    public String findById(@RequestParam(value = "id") String id){
        return new ResultBo(1,orderService.findById(id)).toString();
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(Order order){

        return new ResultBo(orderService.save(order)).toString();
    }

    @RequestMapping(value = "/delete")
    public String delete(Order order){
        return new ResultBo(orderService.delete(order)).toString();
    }

    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public ResultBo upload(@RequestParam("file") MultipartFile file){
        return orderService.upload(file);
    }


}
