package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.commons.CacheUtils;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.LevelDao;
import com.shouyou.ims.entity.Level;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/7/19.
 */
@Service
public class LevelService {
    @Autowired
    private LevelDao levelDao;

    public PageInfo<Level> findList(Level level){
        PageHelper.startPage(level.getPageNum(),level.getPageSize());
        PageInfo<Level> pageInfo;
        if(level.getPageSize() == 0){
            if(CacheUtils.get("levels") == null){
                pageInfo = new PageInfo<>(levelDao.findList(level));
                CacheUtils.put("sysCache","levels",pageInfo);
            }else{
                pageInfo = (PageInfo<Level>) CacheUtils.get("levels");
            }
        }else{
            pageInfo = new PageInfo<>(levelDao.findList(level));
        }
        return pageInfo;
    }

    public Level findById(String id){
        return levelDao.findById(id);
    }

    public int save(Level level){
        int i = 0;
        if(StringUtils.isEmpty(level.getId())){
            level.preInsert();
            i = levelDao.insert(level);
        }else {
            level.preUpdate();
            i = levelDao.update(level);
        }
        CacheUtils.put("sysCache","levels",null);
        return i;
    }

    public int delete(String id){
        return levelDao.delete(id);
    }
    public int delete(List<String> ids){
        return levelDao.deleteMul(ids, UserUtils.getUser().getId());
    }

}
