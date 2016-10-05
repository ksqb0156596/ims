package com.shouyou.ims.commons;

import com.shouyou.ims.entity.User;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

/**
 * Created by makun on 2016/5/24.
 */
public class UserUtils {
    public static User getUser(){
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpServletRequest request = sra.getRequest();
        return getUser(request);

    }

    public static User getUser(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        if(cookies == null)return null;
        User user = null;
        for(Cookie c : cookies){
            if(c.getName().equals("IMS_USER")){
                String value = c.getValue();
                if(CacheUtils.get("userinfo",value) != null) {
                    user = (User) CacheUtils.get("userinfo", value);
                }
            }
        }
        return user;

    }

    public static void putUser(User user){
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpServletResponse response = sra.getResponse();
        String id = UUID.randomUUID().toString();
        Cookie cookie = new Cookie("IMS_USER",id);
        cookie.setPath("/");
        CacheUtils.put("userinfo",id,user);
        response.addCookie(cookie);
    }

    public static void delUser(){
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        HttpServletResponse response = sra.getResponse();
        User user = getUser();
        CacheUtils.remove("userinfo",user.getId());
    }
}
