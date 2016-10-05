package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.Account;
import com.shouyou.ims.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2016/7/19.
 */
@RestController
@RequestMapping(value = "/ims/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "/findList")
    public String findList(Account account){
        return new ResultBo(1,accountService.findList(account)).toString();
    }

    @RequestMapping(value = "/findById")
    public String findById(@RequestParam(value = "id") String id){
        return new ResultBo(1,accountService.findById(id)).toString();
    }

    @RequestMapping(value = "/findListByInfo")
    public String findListByInfo(Account account){
        return new ResultBo(1,accountService.findListByInfo(account)).toString();
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(Account account){
        return new ResultBo(accountService.save(account)).toString();
    }

    @RequestMapping(value = "/delete")
    public String delete(@RequestParam(value = "id")String id){
        return new ResultBo<>(1,accountService.delete(id)).toString();
    }

    @RequestMapping(value = "/deleteMul",method = RequestMethod.POST)
    public String deleteMul(@RequestParam("ids[]")List<String> ids){
        return new ResultBo<>(1,accountService.deleteMul(ids)).toString();
    }






}
