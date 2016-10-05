package com.shouyou.ims.entity;

import com.shouyou.ims.commons.BaseEntity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * Created by makun on 2016/5/24.
 */
public class Order extends BaseEntity implements Serializable {

    private String orderNo;
    private String clientId;
    private String gameId;
    private String platformId;
    private String accountId;
    private String payId;
    private String tradingId;
    private String directorId;
    private Integer status;
    private BigDecimal productionPrice;
    private BigDecimal tradingPrice;
    private BigDecimal discount;
    private BigDecimal profit;
    private BigDecimal point;
    private BigDecimal realPoint;
    private Integer rechargeType;
    private String clientName;
    private String clientBelong;
    private String clientBelongId;
    private String gameName;
    private String platformName;
    private String accountName;
    private String directorName;
    private String payName;

    private String tradingName;
    private String denomination;
    private String levelName;
    private String accountPwd;

    public String getAccountPwd() {
        return accountPwd;
    }

    public void setAccountPwd(String accountPwd) {
        this.accountPwd = accountPwd;
    }

    public BigDecimal getPoint() {
        return point;
    }

    public void setPoint(BigDecimal point) {
        this.point = point;
    }

    public BigDecimal getRealPoint() {
        return realPoint;
    }

    public void setRealPoint(BigDecimal realPoint) {
        this.realPoint = realPoint;
    }

    public String getClientBelongId() {
        return clientBelongId;
    }

    public void setClientBelongId(String clientBelongId) {
        this.clientBelongId = clientBelongId;
    }

    public String getDirectorId() {
        return directorId;
    }

    public void setDirectorId(String directorId) {
        this.directorId = directorId;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getProfit() {
        return profit;
    }

    public void setProfit(BigDecimal profit) {
        this.profit = profit;
    }

    public String getClientBelong() {
        return clientBelong;
    }

    public void setClientBelong(String clientBelong) {
        this.clientBelong = clientBelong;
    }

    public String getDirectorName() {
        return directorName;
    }

    public void setDirectorName(String directorName) {
        this.directorName = directorName;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getDenomination() {
        return denomination;
    }

    public void setDenomination(String denomination) {
        this.denomination = denomination;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getPlatformId() {
        return platformId;
    }

    public void setPlatformId(String platformId) {
        this.platformId = platformId;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getPayId() {
        return payId;
    }

    public void setPayId(String payId) {
        this.payId = payId;
    }

    public String getTradingId() {
        return tradingId;
    }

    public void setTradingId(String tradingId) {
        this.tradingId = tradingId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public BigDecimal getProductionPrice() {
        return productionPrice;
    }

    public void setProductionPrice(BigDecimal productionPrice) {
        this.productionPrice = productionPrice;
    }

    public BigDecimal getTradingPrice() {
        return tradingPrice;
    }

    public void setTradingPrice(BigDecimal tradingPrice) {
        this.tradingPrice = tradingPrice;
    }

    public Integer getRechargeType() {
        return rechargeType;
    }

    public void setRechargeType(Integer rechargeType) {
        this.rechargeType = rechargeType;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getPayName() {
        return payName;
    }

    public void setPayName(String payName) {
        this.payName = payName;
    }

    public String getTradingName() {
        return tradingName;
    }

    public void setTradingName(String tradingName) {
        this.tradingName = tradingName;
    }
}
