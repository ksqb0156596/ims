package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.AccountDao;
import com.shouyou.ims.entity.Account;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/7/19.
 */
@Service
public class AccountService {

    @Autowired
    private AccountDao accountDao;

    public PageInfo<Account> findList(Account account){
        PageHelper.startPage(account.getPageNum(),account.getPageSize());
        return new PageInfo<>(accountDao.findList(account));
    }

    public Account findById(String id){
        return accountDao.findById(id);
    }

    public List<Account> findListByInfo(Account account){
        return accountDao.findListByInfo(account);
    }

    public int save(Account account){
        if(StringUtils.isEmpty(account.getId())){
            account.preInsert();
            return accountDao.insert(account);
        }
        account.preUpdate();
        return accountDao.update(account);
    }

    public List<Account> findListByName(String name){
        return accountDao.findListByName(name);
    }
    public int delete(String id){
        return accountDao.delete(id);
    }
    public int deleteMul(List<String> ids){
        return accountDao.deleteMul(ids, UserUtils.getUser().getId());
    }
    public List<Account> findAccount(Account account){
        return accountDao.findAccount(account);
    }
}
