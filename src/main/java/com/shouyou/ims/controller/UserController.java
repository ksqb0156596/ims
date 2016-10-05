package com.shouyou.ims.controller;

import com.github.pagehelper.PageInfo;
import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.User;
import com.shouyou.ims.entity.UserRole;
import com.shouyou.ims.service.UserService;
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
@RequestMapping(value = "/ims/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/findList",method = RequestMethod.GET)
    public ResultBo<PageInfo<User>> findList(User user){
        return new ResultBo<>(1,userService.findList(user));
    }

    @RequestMapping(value = "/findById",method = RequestMethod.GET)
    public String findById(String id){
        return new ResultBo<>(1,userService.findById(id)).toString();
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(User user){
        return new ResultBo<>(userService.save(user)).toString();
    }

    @RequestMapping(value = "/delete")
    public String delete(String id){
        return new ResultBo<>(userService.delete(id)).toString();
    }

    @RequestMapping(value = "/deleteMul")
    public ResultBo deleteMul( @RequestParam("ids[]") List<String> ids){
        return new ResultBo<>(userService.deleteMul(ids));
    }

    @RequestMapping(value = "/resetPwd",method = RequestMethod.POST)
    public ResultBo resetPwd(String id){
        return new ResultBo<>(userService.resetPwd(id));
    }

    @RequestMapping(value = "/assRole",method = RequestMethod.POST)
    public ResultBo assRole(@RequestParam("ids[]") List<String> ids,@RequestParam("userId") String userId){
        return new ResultBo(userService.assRole(ids,userId));
    }

    @RequestMapping(value = "/findUserRoles",method = RequestMethod.GET)
    public ResultBo findUserRoles(@RequestParam("userId") String userId){
        return new ResultBo(1,userService.findUserRole(userId));
    }
    @RequestMapping(value = "/changePwd", method = RequestMethod.POST)
    public ResultBo changePwd(@RequestParam("oldPwd")String oldPwd,@RequestParam("newPwd")String newPwd){
        return userService.changePwd(oldPwd,newPwd);
    }


}
