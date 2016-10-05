package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.GamePlatform;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Administrator on 2016/5/14.
 */
@Mapper
public interface GamePlatformDao extends BaseDao<GamePlatform> {
    List<GamePlatform> searchByLike(@Param("search") String search);
    List<GamePlatform> findByName(@Param("search") String search);
    List<GamePlatform> searchByEn(@Param("list")List<String> list);

}
