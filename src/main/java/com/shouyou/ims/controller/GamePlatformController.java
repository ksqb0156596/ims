package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.GamePlatform;
import com.shouyou.ims.service.GamePlatformService;
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
@RequestMapping(value = "/ims/platform")
public class GamePlatformController {

    @Autowired
    private GamePlatformService gamePlatformService;

    @RequestMapping(value = "/search")
    public Object search(@RequestParam("search") String search){
        return new ResultBo<>(1,gamePlatformService.search(search));
    }

    @RequestMapping(value = "/findList")
    public String findList(GamePlatform gamePlatform){
        return new ResultBo<>(1,gamePlatformService.findList(gamePlatform)).toString();
    }

    @RequestMapping(value = "/findById",method = RequestMethod.GET)
    public String findById(String id){
        return new ResultBo<>(1,gamePlatformService.findById(id)).toString();
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(GamePlatform gamePlatform){
        return new ResultBo<>(gamePlatformService.save(gamePlatform)).toString();
    }

    @RequestMapping(value = "/delete")
    public String delete(String id){
        return new ResultBo<>(gamePlatformService.delete(id)).toString();
    }

    @RequestMapping(value = "/deleteMul")
    public String delete(@RequestParam("ids[]") List<String> ids){
        return new ResultBo<>(gamePlatformService.delete(ids)).toString();
    }
}
