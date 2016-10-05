package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.Client;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by Administrator on 2016/5/14.
 */
@Mapper
public interface ClientDao extends BaseDao<Client>{
    Client queryRepeat(Client client);
    List<Client> findListCon(@Param("condition") String condition);
    int updatePrice(Client client);
}
