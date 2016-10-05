package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.bo.ResultBo;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.ResourcesDao;
import com.shouyou.ims.dao.RoleDao;
import com.shouyou.ims.entity.Resources;
import com.shouyou.ims.entity.Role;
import com.shouyou.ims.entity.RoleResource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2016/8/25.
 */
@Service
public class RoleResourceService {
    @Autowired
    private RoleDao roleDao;
    @Autowired
    private ResourcesDao resourcesDao;

    public List<RoleResource> getTree(int type){
        String userId = UserUtils.getUser().getId();
        List<RoleResource> list;
        if("admin".equals(userId)){
            list = roleDao.selectAllResource(type);
        }else {
            list = roleDao.selectRoleResource(userId, type);
        }
        List<RoleResource> treeList = new ArrayList<>();
        for(RoleResource roleResource : list){
            if(roleResource.getParentId() == 0){
                roleResource.setChildren( this.getChild(list,roleResource.getResourceId()));
                treeList.add(roleResource);
            }
        }
        return treeList;
    }

    public List<Role> getRoles(){
        return roleDao.findList(new Role());
    }

    public List<RoleResource> getRoleTree(String roleId){
        List<RoleResource> list = roleDao.selectRoleResource(roleId,0);
        List<RoleResource> treeList = new ArrayList<>();
        for(RoleResource roleResource : list){
            if(roleResource.getParentId() == 0){
                roleResource.setChildren( this.getChild(list,roleResource.getResourceId()));
                treeList.add(roleResource);
            }
        }
        return treeList;
    }

    public PageInfo<Resources> findResourceList(int pageNum,int pageSize,Resources resources){
        PageHelper.startPage(pageNum, pageSize);
        return new PageInfo<>(resourcesDao.findList(resources));

    }

    public ResultBo save(Resources resources){
        if(resources.getId() == null){
            resourcesDao.insert(resources);
        }else{
            resourcesDao.update(resources);
        }
        return new ResultBo(1);
    }

    public ResultBo deleteMul(List<String> ids){
        resourcesDao.deleteMul(ids, UserUtils.getUser().getId());
        return new ResultBo(1);
    }

    public PageInfo<Role> findRoleList(int pageNum,int pageSize,Role role){
        PageHelper.startPage(pageNum, pageSize);
        return new PageInfo<>(roleDao.findList(role));
    }

    public Role findRoleById(String id){
        return roleDao.findById(id);
    }

    public ResultBo save(Role role){
        if(role.getId() == null){
            roleDao.insert(role);
        }else{
            roleDao.update(role);
        }
        return new ResultBo(1);
    }

    public ResultBo deleteRoleMul(List<String> ids){
        return new ResultBo(roleDao.deleteMul(ids, UserUtils.getUser().getId()));
    }

    public List<String> findRoleResourceList(String roleId){
        return roleDao.findRoleResourceList(roleId);
    }

    public ResultBo saveRoleResource(String roleId,List<String> ids){
        roleDao.deleteRoleResource(roleId);
        return new ResultBo(roleDao.insertRoleResourceBatch(ids,roleId));
    }





    private List<RoleResource> getChild(List<RoleResource> list,int id){
        List<RoleResource> children = new ArrayList<>();
        for(RoleResource r : list){
            if(r.getParentId() == id){
                children.add(r);
                r.setChildren(getChild(list,r.getResourceId()));
            }
        }
        return children;
    }





}
