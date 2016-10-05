package com.shouyou.ims.bo;

import com.alibaba.fastjson.JSON;

import java.io.Serializable;

/**
 * Created by makun on 2016/3/22.
 */
public class ResultBo<T> implements Serializable {
    private int status = 0;
    private String msg = "";
    private T result;

    public ResultBo(){}
    public ResultBo(int status){
        this.status = status;
    }
    public ResultBo(int status, T t){
        this.status = status;
        this.result = t;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }

    @Override
    public String toString() {
        if(this.status > 0){
            this.setMsg("操作成功");
        }else{
            this.setMsg("操作失败,请重试");
            this.status = 0;
        }
        return JSON.toJSONString(this);
    }
}
