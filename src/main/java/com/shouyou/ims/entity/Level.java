package com.shouyou.ims.entity;

import com.shouyou.ims.commons.BaseEntity;

/**
 * Created by makun on 2016/5/24.
 */
public class Level extends BaseEntity {

    private int minAmount;
    private int maxAmount;
    private String name;

    public int getMinAmount() {
        return minAmount;
    }

    public void setMinAmount(int minAmount) {
        this.minAmount = minAmount;
    }

    public int getMaxAmount() {
        return maxAmount;
    }

    public void setMaxAmount(int maxAmount) {
        this.maxAmount = maxAmount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
