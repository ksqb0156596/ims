package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.Level;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2016/5/15.
 */
@Mapper
public interface LevelDao extends BaseDao<Level> {
    String queryLevel(@Param("amount") Integer amount);
}
