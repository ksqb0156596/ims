package com.shouyou.ims.entity;

import com.shouyou.ims.commons.BaseEntity;

import java.io.Serializable;

/**
 * Created by makun on 2016/5/24.
 */
public class Level extends BaseEntity implements Serializable {

    private Integer minAmount;
    private Integer maxAmount;
    private Integer amount;
    private String name;

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getMinAmount() {
        return minAmount;
    }

    public void setMinAmount(Integer minAmount) {
        this.minAmount = minAmount;
    }

    public Integer getMaxAmount() {
        return maxAmount;
    }

    public void setMaxAmount(Integer maxAmount) {
        this.maxAmount = maxAmount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
