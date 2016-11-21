package com.shouyou.ims.entity;

import java.math.BigDecimal;

/**
 * Created by Administrator on 2016/10/16.
 */
public class StatisticsResult {
    private BigDecimal trading;//交易金额
    private BigDecimal cost;//成本
    private BigDecimal profit;//利润
    private BigDecimal denomination;//面额
    private Integer num;
    private String name;

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public BigDecimal getTrading() {
        return trading;
    }

    public void setTrading(BigDecimal trading) {
        this.trading = trading;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    public BigDecimal getProfit() {
        return profit;
    }

    public void setProfit(BigDecimal profit) {
        this.profit = profit;
    }

    public BigDecimal getDenomination() {
        return denomination;
    }

    public void setDenomination(BigDecimal denomination) {
        this.denomination = denomination;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
