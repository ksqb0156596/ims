package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.Account;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Administrator on 2016/5/15.
 */
@Mapper
public interface AccountDao extends BaseDao<Account>{
    List<Account> findListByInfo(Account account);
    List<Account> findAccount(Account account);
    List<Account> findListByName(@Param("name")String name);
}
