package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.ClientDao;
import com.shouyou.ims.entity.Client;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/7/19.
 */
@Service
public class ClientService {
    @Autowired
    private ClientDao clientDao;

    public PageInfo<Client> findList(Client client){
        PageHelper.startPage(client.getPageNum(),client.getPageSize());
        return new PageInfo<>(clientDao.findList(client));
    }

    public Client findById(String id){
        return clientDao.findById(id);
    }

    public ResultBo<Client> save(Client client){

        if(StringUtils.isEmpty(client.getId())){
            Client c = this.checkRepeat(client);
            if(c!=null){
                return new ResultBo(0,c);
            }
            client.preInsert();
            client.setUserId(UserUtils.getUser().getId());
            client.setUserName(UserUtils.getUser().getName());
            clientDao.insert(client);
            return new ResultBo(1,client);
        }
        client.preUpdate();
        clientDao.update(client);
        return new ResultBo(1,client);
    }

    public int updatePrice(Client client){
        return clientDao.updatePrice(client);
    }

    public int delete(String id){
        return clientDao.delete(id);
    }

    public int delete(List<String> ids){
        return clientDao.deleteMul(ids, UserUtils.getUser().getId());
    }

    public Client checkRepeat(Client client){
        return clientDao.queryRepeat(client);
    }

    public List<Client> findClientCon(String condition){
        return clientDao.findListCon(condition);
    }



}
