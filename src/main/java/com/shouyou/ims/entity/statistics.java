package com.shouyou.ims.entity;

import com.shouyou.ims.bo.StatisticsBo;

/**
 * Created by Administrator on 2016/10/16.
 */
public class Statistics {
    private String tableName;
    private String tableId;
    private String name;
    private String startDate;
    private String endDate;
    public Statistics(){

    }
    public Statistics(StatisticsBo statisticsBo){
        this.name = statisticsBo.getName();
        this.startDate = statisticsBo.getStartDate();
        this.endDate = statisticsBo.getEndDate();
    }


    public String getTableId() {
        return tableId;
    }

    public void setTableId(String tableId) {
        this.tableId = tableId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTableName() {

        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
}
