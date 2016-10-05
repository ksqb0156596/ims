package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.GamePlatformDao;
import com.shouyou.ims.entity.GamePlatform;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Created by Administrator on 2016/7/19.
 */
@Service
public class GamePlatformService {
    @Autowired
    private GamePlatformDao gamePlatformDao;
    private Pattern p=Pattern.compile("[\u4e00-\u9fa5]");

    public List<GamePlatform> search(String search){
        char[] chars = search.toCharArray();
        List<GamePlatform> list = gamePlatformDao.searchByLike(search);
        char first = chars[0];
        if(!p.matcher(String.valueOf(first)).find()){
            List<String> chList = new ArrayList<>();
            for(int i = 0;i < chars.length; i++){
                char c = chars[i];
                String temp = String.valueOf(c);
                if(!p.matcher(temp).find()){
                    chList.add(temp);
                }else {
                    break;
                }
            }
            list.addAll(gamePlatformDao.searchByEn(chList));
        }
        return list;
    }

    public PageInfo<GamePlatform> findList(GamePlatform gamePlatform){
        PageHelper.startPage(gamePlatform.getPageNum(),gamePlatform.getPageSize());
        return new PageInfo<>(gamePlatformDao.findList(gamePlatform));
    }

    public GamePlatform findById(String id){
        return gamePlatformDao.findById(id);
    }

    public int save(GamePlatform gamePlatform){
        if(StringUtils.isEmpty(gamePlatform.getId())){
            gamePlatform.preInsert();
            return gamePlatformDao.insert(gamePlatform);
        }
        gamePlatform.preUpdate();
        return gamePlatformDao.update(gamePlatform);
    }

    public int delete(String id){
        return gamePlatformDao.delete(id);
    }

    public int delete(List<String> ids){
        return gamePlatformDao.deleteMul(ids, UserUtils.getUser().getId());
    }
}
