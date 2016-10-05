package com.shouyou.ims.controller;

import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.entity.Resources;
import com.shouyou.ims.entity.Role;
import com.shouyou.ims.entity.RoleResource;
import com.shouyou.ims.service.RoleResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Administrator on 2016/8/28.
 */
@RestController
@RequestMapping("/ims/role")
public class RoleResourceController {

    @Autowired
    private RoleResourceService roleResourceService;

    /**
     *
     * @param type 1.获取菜单列表 2.获取所有菜单
     * @return
     */
    @RequestMapping("/getMenus")
    public Object getMenus(@RequestParam(required = false,value = "type")int type){
            return roleResourceService.getTree(type);
    }

    @RequestMapping("/findResourceList")
    public Object findResourceList(int pageNum,int pageSize,Resources resources){
        return new ResultBo<>(1,roleResourceService.findResourceList(pageNum,pageSize,resources));
    }

    @RequestMapping(value = "/save",method = RequestMethod.POST)
    public ResultBo save( Resources resources){
        return roleResourceService.save(resources);
    }

    @RequestMapping(value = "/deleteMul",method = RequestMethod.POST)
    public ResultBo deleteMul( @RequestParam("ids[]") List<String> ids){
        return roleResourceService.deleteMul(ids);
    }

    @RequestMapping(value = "/getRoles")
    public ResultBo getRoles(){
        return new ResultBo(1,roleResourceService.getRoles());
    }

    @RequestMapping(value = "/findRoleList")
    public ResultBo findRoleList(int pageNum,int pageSize,Role role){
        return new ResultBo(1,roleResourceService.findRoleList(pageNum,pageSize,role));
    }

    @RequestMapping(value = "/saveRole",method = RequestMethod.POST)
    public ResultBo save(Role role){
        return roleResourceService.save(role);
    }

    @RequestMapping(value = "/deleteRoleMul",method = RequestMethod.POST)
    public ResultBo deleteRoleMul(@RequestParam("ids[]")List<String> ids){
        return roleResourceService.deleteRoleMul(ids);
    }

    @RequestMapping(value = "/findRoleResourceList")
    public ResultBo findRoleResourceList(@RequestParam("roleId") String roleId){
        return new ResultBo(1,roleResourceService.findRoleResourceList(roleId));
    }

    @RequestMapping(value = "saveRoleResource",method = RequestMethod.POST)
    public ResultBo saveRoleResource(@RequestParam("roleId") String roleId,@RequestParam("ids[]")List<String> ids){
        return roleResourceService.saveRoleResource(roleId,ids);
    }


}
