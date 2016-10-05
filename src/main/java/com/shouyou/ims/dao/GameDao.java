package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.Game;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Administrator on 2016/5/14.
 */
@Mapper
public interface GameDao extends BaseDao<Game> {
    List<Game> searchByLike(@Param("search") String search);
    List<Game> searchByEn(@Param("list")List<String> list);
    List<Game> findByName(@Param("search") String search);
}
