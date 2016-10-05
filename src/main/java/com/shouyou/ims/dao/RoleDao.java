package com.shouyou.ims.dao;

import com.shouyou.ims.commons.BaseDao;
import com.shouyou.ims.entity.Role;
import com.shouyou.ims.entity.RoleResource;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by Administrator on 2016/8/14.
 */
@Mapper
public interface RoleDao extends BaseDao<Role>{
    int insertRoleResource(RoleResource roleResource);
    int insertRoleResourceBatch(@Param("list") List<String> list,@Param("roleId") String roleId);
    int updateRoleResource(RoleResource roleResource);
    List<RoleResource> selectRoleResource(@Param("id") String id,@Param("buttonFlag") int buttonFlag);
    List<RoleResource> selectAllResource(@Param("buttonFlag") int buttonFlag);
    List<String> findRoleResourceList(@Param("roleId")String roleId);
    int deleteRoleResource(String roleId);
    List<Role> getRoles();
}
