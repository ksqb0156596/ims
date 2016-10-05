package com.shouyou.ims.entity;

import com.shouyou.ims.commons.BaseEntity;

import java.io.Serializable;

/**
 * Created by makun on 2016/5/24.
 */
public class Account extends BaseEntity implements Serializable {
    private String name;
    private String password;
    private String clientId;
    private String platformId;
    private String gameId;
    private int status;
    private String gameName;
    private String clientName;
    private String platformName;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getPlatformId() {
        return platformId;
    }

    public void setPlatformId(String platformId) {
        this.platformId = platformId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }
}
