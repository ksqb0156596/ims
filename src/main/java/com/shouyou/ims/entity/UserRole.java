package com.shouyou.ims.entity;

/**
 * Created by Administrator on 2016/9/11.
 */
public class UserRole {
    private String id;
    private String roleId;
    private String usersId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getUsersId() {
        return usersId;
    }

    public void setUsersId(String usersId) {
        this.usersId = usersId;
    }
}
