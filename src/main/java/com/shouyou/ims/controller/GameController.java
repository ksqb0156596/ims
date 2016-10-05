package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.Game;
import com.shouyou.ims.service.GameService;
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
@RequestMapping(value = "/ims/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @RequestMapping(value = "/findList")
    public String findList(Game game){
        return new ResultBo<>(1,gameService.findList(game)).toString();
    }

    @RequestMapping(value = "/search")
    public Object search(@RequestParam("search") String search){
        return new ResultBo<>(1,gameService.search(search));
    }

    @RequestMapping(value = "/findById",method = RequestMethod.GET)
    public String findById(String id){
        return new ResultBo<>(1,gameService.findById(id)).toString();
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(Game game){
        return new ResultBo<>(gameService.save(game)).toString();
    }

    @RequestMapping(value = "/delete")
    public String delete(String id){
        return new ResultBo<>(gameService.delete(id)).toString();
    }

    @RequestMapping(value = "/deleteMul",method = RequestMethod.POST)
    public String delete(@RequestParam("ids[]") List<String> id){
        return new ResultBo<>(gameService.delete(id)).toString();
    }
}
