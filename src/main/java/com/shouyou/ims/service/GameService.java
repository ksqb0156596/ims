package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.GameDao;
import com.shouyou.ims.entity.Game;
import com.shouyou.ims.entity.SearchPYEntity;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Administrator on 2016/7/19.
 */

@Service
public class GameService {

    @Autowired
    private GameDao gameDao;

    private Pattern p=Pattern.compile("[\u4e00-\u9fa5]");

    public PageInfo<Game> findList(Game game){
        PageHelper.startPage(game.getPageNum(),game.getPageSize());
        return new PageInfo<>(gameDao.findList(game));
    }

    public List<Game> search(String search){
        char[] chars = search.toCharArray();
        List<Game> list = gameDao.searchByLike(search);
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
            list.addAll(gameDao.searchByEn(chList));
        }
        return list;

    }

    public Game findById(String id){
        return gameDao.findById(id);
    }

    public int save(Game game){
        if(StringUtils.isEmpty(game.getId())){
            game.preInsert();
            return gameDao.insert(game);
        }
        game.preUpdate();
        return gameDao.update(game);
    }

    public int delete(String id){
        return gameDao.delete(id);
    }

    public int delete(List<String> ids){
        return gameDao.deleteMul(ids, UserUtils.getUser().getId());
    }
}
