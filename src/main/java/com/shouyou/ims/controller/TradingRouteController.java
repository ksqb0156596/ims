package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.TradingRoute;
import com.shouyou.ims.service.TradingRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2016/7/20.
 */
@RestController
@RequestMapping("/ims/trading")
public class TradingRouteController {
    @Autowired
    private TradingRouteService tradingRouteService;

    @RequestMapping(value = "/findList")
    public String findList(TradingRoute tradingRoute){
        return new ResultBo<>(1,tradingRouteService.findList(tradingRoute)).toString();
    }

    @RequestMapping(value = "/findById",method = RequestMethod.GET)
    public String findById(String id){
        return new ResultBo<>(1,tradingRouteService.findById(id)).toString();
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(TradingRoute tradingRoute){
        return new ResultBo<>(tradingRouteService.save(tradingRoute)).toString();
    }

    @RequestMapping(value = "/delete")
    public String delete(String id){
        return new ResultBo<>(tradingRouteService.delete(id)).toString();
    }

    @RequestMapping(value = "/deleteMul")
    public String deleteMul(List<String> ids){
        return new ResultBo<>(tradingRouteService.delete(ids)).toString();
    }
}
