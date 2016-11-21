package com.shouyou.ims.entity;

import java.math.BigDecimal;

/**
 * Created by Administrator on 2016/10/16.
 */
public class StatisticsAll {
    private Integer clientCount;
    private Integer accountCount;
    private Integer orderCount;
    private BigDecimal denomination;
    private BigDecimal trading;
    private BigDecimal cost;
    private BigDecimal profit;

    public BigDecimal getDenomination() {
        return denomination;
    }

    public void setDenomination(BigDecimal denomination) {
        this.denomination = denomination;
    }

    public Integer getClientCount() {
        return clientCount;
    }

    public void setClientCount(Integer clientCount) {
        this.clientCount = clientCount;
    }

    public Integer getAccountCount() {
        return accountCount;
    }

    public void setAccountCount(Integer accountCount) {
        this.accountCount = accountCount;
    }

    public Integer getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(Integer orderCount) {
        this.orderCount = orderCount;
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
}
