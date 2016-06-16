package com.shouyou.ims.commons;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * Created by makun on 2016/5/24.
 */
public class UserUtils {
    public static String getUesr(){
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes) ra;
        return sra.getRequest().getSession().getAttribute("userId").toString();

    }
}
