package com.shouyou.ims.filter;

import com.shouyou.ims.commons.CacheUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
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
        HttpServletRequest _request = (HttpServletRequest) request;
        String userId = String.valueOf(_request.getSession().getAttribute("userId"));
        if(userId != null){
            if(CacheUtils.get("user",userId) != null){
                filterChain.doFilter(request,response);
            }
        }
    }

    @Override
    public void destroy() {

    }
}
