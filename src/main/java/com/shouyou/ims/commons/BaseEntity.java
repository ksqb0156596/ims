package com.shouyou.ims.commons;

import java.util.Date;
import java.util.UUID;

/**
 * Created by Administrator on 2016/5/14.
 */
public class BaseEntity {
    private String id;
    private Date updateDate;
    private Date insertDate;
    private String updateUser;
    private String insertUser;
    private String remark;

    /**分页**/
    private int pageNum;
    private int pageSize;

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void preInsert(){
        this.insertDate = new Date();
        this.updateDate = new Date();
        this.insertUser = UserUtils.getUesr();
        this.updateUser = UserUtils.getUesr();
        this.id = UUID.randomUUID().toString();
    }

    public void preUpdate(){
        this.updateUser = UserUtils.getUesr();
        this.updateDate = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public String getInsertUser() {
        return insertUser;
    }

    public void setInsertUser(String insertUser) {
        this.insertUser = insertUser;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
