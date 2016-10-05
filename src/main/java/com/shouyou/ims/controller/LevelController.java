package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.Level;
import com.shouyou.ims.service.LevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Administrator on 2016/7/20.
 */
@RestController
@RequestMapping(value = "/ims/level")
public class LevelController {

    @Autowired
    private LevelService levelService;

    @RequestMapping(value = "/findList",method = RequestMethod.GET)
    public String findList(Level level){
        return new ResultBo<>(1,levelService.findList(level)).toString();
    }

    @RequestMapping(value = "/findById",method = RequestMethod.GET)
    public String findById(String id){
        return new ResultBo<>(1,levelService.findById(id)).toString();
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(Level level){
        return new ResultBo<>(levelService.save(level)).toString();
    }

    @RequestMapping(value = "/delete")
    public String delete(String id){
        return new ResultBo<>(levelService.delete(id)).toString();
    }
}
