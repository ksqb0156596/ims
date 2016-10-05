package com.shouyou.ims.entity;

import com.shouyou.ims.commons.BaseEntity;

import java.io.Serializable;

/**
 * Created by makun on 2016/5/24.
 */
public class Game extends BaseEntity implements Serializable {

    private String name;
    private int status;

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
