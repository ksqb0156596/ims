package com.shouyou.ims.entity;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/8/14.
 */
public class Role implements Serializable{
    private Integer id;
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
