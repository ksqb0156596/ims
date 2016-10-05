package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Administrator on 2016/9/10.
 */
@Controller
@RequestMapping(value = "/login")
public class LoginController {

    @Autowired
    private UserService userService;

    public ModelAndView login(HttpServletRequest request,HttpServletResponse response){
        String url = request.getRequestURI();
        if(url.endsWith(".html")){
            return null;
        }
        try {
            response.sendRedirect("/login.html");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public ResultBo login(@RequestParam("username")String username, @RequestParam("password")String password){
        return userService.login(username,password);
    }

    @RequestMapping(value = "/logout",method = RequestMethod.POST)
    @ResponseBody
    public String logout(@RequestParam("id")String id){
        return userService.logout(id);
    }
}
