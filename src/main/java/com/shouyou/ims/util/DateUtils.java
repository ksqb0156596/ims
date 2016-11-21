package com.shouyou.ims.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2016/11/1.
 */
public class DateUtils {
    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("yyyyMMdd");

    public static Date parse(String str){
        try {
            return simpleDateFormat.parse(str);
        } catch (Exception e) {
            return null;
        }
    }
    public static String format(Date date){
        return simpleDateFormat1.format(date);
    }
}
