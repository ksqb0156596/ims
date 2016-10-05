package com.shouyou.ims.filter;

import com.shouyou.ims.commons.CacheUtils;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.entity.User;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/**
 * Created by makun on 2016/3/18.
 */
public class LoginFilter implements Filter {



    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest res = (HttpServletRequest) request;
        HttpServletResponse response1 = (HttpServletResponse) response;
        User user = UserUtils.getUser(res);
        if(user == null){
            response1.setStatus(9999);
        }else {
            filterChain.doFilter(request,response);
        }
    }

    @Override
    public void destroy() {

    }
}
