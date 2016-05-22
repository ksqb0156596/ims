package com.shouyou.ims.entity;

import com.shouyou.ims.commons.BaseEntity;

/**
 * Created by Administrator on 2016/5/14.
 */
public class User extends BaseEntity {
    private String role;
    private String name;
    private int status;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
