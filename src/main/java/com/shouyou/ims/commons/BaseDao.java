package com.shouyou.ims.commons;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Administrator on 2016/5/14.
 */

public interface BaseDao<T> {
    int deleteMul(@Param("ids") List<String> ids,@Param("userId")String userId);
    List<T> findList(T t);
    int delete(String id);
    int delete(T t);
    int update(T t);
    int insert(T t);
    T findById(String id);

}
