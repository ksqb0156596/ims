/**
 * Created by Administrator on 2016/10/1.
 */
var React = require('react');
import { Modal } from 'antd';
import { Form } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
var FormItem = Form.Item;
var Api = require('../../utils/api-utils');
var Url = require('../../commons/api');
var TopBar = React.createClass({
    getInitialState : function () {
        return {
            visible : false
        }
    },

    render : function () {
        return <div className="title">
            <div className="title-name">先知手游充值管理系统</div>
            <div className="title-user">欢迎您[<a onClick={this.changePassword} style={{color:'red'}}>{$user.username}</a>],
                [<a onClick={this.logout} style={{color:'black'}}>退出</a>]</div>
            {this.state.visible ? <ChangePwd visible={this.state.visible} handleOk={this.handleOk} handleCancel={this.handleCancel}/> : ''}
        </div>
    },
    logout : function () {
        Api.request({
            url : "/login/logout",
            method : "POST",
            data : {id:$user.id}
        }).then(function () {
            window.location.href = "/login";
        })
    },
    changePassword : function () {
        this.setState({visible:true})
    },
    handleOk : function (record) {
        if(record.newPwd != record.secNewPwd){
            Modal.error({title:"修改失败",content:"两次输入的密码不同"});
            return false;
        }
        Api.request({
            method : "POST",
            url : Url.CHANGE_PWD,
            data:record
        }).then(function (data) {
            if(data.status == 1){
                Modal.info({
                    title : "密码修改成功",
                    content : "请重新登陆",
                    onOk : function () {
                        window.location.href = "/login";
                    }
                }
                )
            }else{
                Modal.error({title:"修改失败",content:"原密码输入错误，请重新输入"});
            }
        }
        )
    },
    handleCancel : function () {
        this.setState({visible:false});
    }
});
var ChangePwd = React.createClass({
    getInitialState : function () {
        return {
            record:{}
        }
    },
    render : function () {
        return <Modal
            title="密码修改"
            visible={this.props.visible}
            footer={[
            <Button key="back" type="ghost" size="large" onClick={this.props.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.props.handleOk.bind(null,this.state.record)}>
              修改密码
            </Button>,
          ]}
        >
            <Form>
                <FormItem
                    id="oldPwd"
                    label="旧密码"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Input type="password" id="oldPwd" placeholder="请输入旧密码" onChange={this.handleChange}/>
                </FormItem>
                <FormItem
                    id="newPwd"
                    label="新密码"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Input type="password" id="newPwd" placeholder="请输入新密码" onChange={this.handleChange} />
                </FormItem>
                <FormItem
                    id="secNewPwd"
                    label="重复新密码"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Input type="password" id="secNewPwd" placeholder="再次输入新密码" onChange={this.handleChange} />
                </FormItem>
            </Form>
        </Modal>
    },
    handleChange : function (e) {
        var record = this.state.record;
        record[e.target.id] = e.target.value;
        this.setState({record:record});
    }
})
module.exports = TopBar;