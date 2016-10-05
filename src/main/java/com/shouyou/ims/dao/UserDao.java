package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.User;
import com.shouyou.ims.entity.UserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Administrator on 2016/5/14.
 */
@Mapper
public interface UserDao extends BaseDao<User>{
    User findByUserAndPwd(@Param("username")String username,@Param("password") String password);
    int insertRoleUser(@Param("list") List<String> list,@Param("userId") String userId);
    List<Integer> findRoleUsers(String userId);
    int deleteUserRoles(@Param("userId") String userId);
}
