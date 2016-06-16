package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.dao.UserDao;
import com.shouyou.ims.entity.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by makun on 2016/5/24.
 */
@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public PageInfo<User> findList(User user){
        PageHelper.startPage(user.getPageNum(),user.getPageSize());
        return new PageInfo<>(userDao.findList(user));
    }

    public User findById(String id){
        return userDao.findById(id);
    }

    public int save(User user){
        if(StringUtils.isEmpty(user.getId())){
            user.preInsert();
            return userDao.insert(user);
        }
        user.preUpdate();
        return userDao.update(user);
    }

    public int delete(User user){
        return userDao.delete(user);
    }

}
