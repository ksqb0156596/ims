package com.shouyou.ims.commons;

import java.util.List;

/**
 * Created by Administrator on 2016/5/14.
 */
public interface BaseDao<T> {
    int delete(String id);
    int delete(T t);
    int update(T t);
    int insert(T t);
    List<T> findList(T t);
    T findById(String id);

}
