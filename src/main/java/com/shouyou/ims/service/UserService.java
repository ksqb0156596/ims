package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.commons.CacheUtils;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.UserDao;
import com.shouyou.ims.entity.User;
import com.shouyou.ims.entity.UserRole;
import com.shouyou.ims.util.EncryptionUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.security.MD5Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
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

    public ResultBo login(String username, String password){
        password = EncryptionUtil.getHash("ims_"+password,"SHA");
        User user = userDao.findByUserAndPwd(username,password);
        ResultBo resultBo = new ResultBo();
        if(user == null){
            resultBo.setStatus(0);
            resultBo.setMsg("用户名密码错误");
            return resultBo;
        }
        resultBo.setStatus(1);
        resultBo.setResult(user);
        UserUtils.putUser(user);
        return resultBo;
    }

    public int save(User user){
        if(StringUtils.isEmpty(user.getId())){
            user.preInsert();
            user.setPassword(EncryptionUtil.getHash("ims_shouyou_123456","SHA"));
            return userDao.insert(user);
        }
        user.preUpdate();
        return userDao.update(user);
    }

    public int delete(String id){
        return userDao.delete(id);
    }

    public int deleteMul(List<String> ids){
        return userDao.deleteMul(ids, UserUtils.getUser().getId());
    }

    public int resetPwd(String id){
        User user = new User();
        user.setId(id);
        user.setPassword(EncryptionUtil.getHash("ims_shouyou_123456","SHA"));
        return userDao.update(user);
    }

    public int assRole(List<String> list,String userId){
        userDao.deleteUserRoles(userId);
        return userDao.insertRoleUser(list,userId);
    }

    public List<Integer> findUserRole(String id){
        return userDao.findRoleUsers(id);
    }

    public String logout(String id){
        CacheUtils.remove("userinfo",id);
        return new ResultBo<>(1).toString();
    }

    public ResultBo changePwd(String oldPwd,String newPwd){
        User user = UserUtils.getUser();
        oldPwd = EncryptionUtil.getHash("ims_"+oldPwd,"SHA");
        if(oldPwd.equals(user.getPassword())){
            user.setPassword(EncryptionUtil.getHash("ims_"+newPwd,"SHA"));
            user.preUpdate();
            userDao.update(user);
            return new ResultBo(1);
        }else{
            return new ResultBo(0);
        }
    }

}
