package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.Client;
import com.shouyou.ims.service.ClientService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2016/7/20.
 */
@RestController
@RequestMapping(value = "/ims/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @RequestMapping(value = "/findList")
    public String findList(Client client){
        return new ResultBo<>(1,clientService.findList(client)).toString();
    }

//    @RequestMapping(value = "/checkRepeat")
//    public String checkRepeat(Client client){
//        client = clientService.checkRepeat(client);
//        if(client == null){
//            return new ResultBo<>(0).toString();
//        }else {
//            return new ResultBo<>(1, client).toString();
//        }
//    }

    @RequestMapping(value = "/findClientCon")
    public Object findClientCon(@RequestParam("condition") String condition){
        return clientService.findClientCon(condition);
    }

    @RequestMapping(value = "/findById",method = RequestMethod.GET)
    public String findById(String id){
        return new ResultBo<>(1,clientService.findById(id)).toString();
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public String save(Client client){
        return clientService.save(client).toString();
    }

    @RequestMapping(value = "/delete")
    public String delete(String id){
        return new ResultBo<>(clientService.delete(id)).toString();
    }

    @RequestMapping(value = "/deleteMul",method = RequestMethod.POST)
    public String deleteMul(@RequestParam("ids") List<String> id){
        return new ResultBo<>(clientService.delete(id)).toString();
    }
}
