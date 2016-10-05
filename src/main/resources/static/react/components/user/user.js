/**
 * Created by Administrator on 2016/9/4.
 */
var React = require('react');
var _ = require('underscore');
var swal = require('sweetalert');
import {Table} from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Modal } from 'antd';
import { Select } from 'antd';
import { message } from 'antd';
import { Popconfirm } from 'antd';
import { Transfer } from 'antd';
import { Form, Row, Col } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
var Api = require("../../utils/api-utils");
var Url = require("../../commons/api");
require("../../css/searchForm.css");



var User = React.createClass({
    componentWillMount : function () {
        this.findList(1,20)
    },
    getInitialState : function(){
        return {menus : [],
            loading: false,
            visible: false,
            record : {},
            pageNum:1,
            pageSize:20,
            searchModal : {},
            selectedRows : [],
            isInsert : false,
            /**分配权限**/
            roleLoading : false,
            roleVisible : false,
            roles : [],
            targetKeys : [],
            userId:''

        }
    },
    findList : function(current,pageSize){
        Api.request({
            method : "GET",
            url : Url.FIND_USER_LIST,
            data : _.extend({pageNum:current,pageSize:pageSize},this.state.searchModal)
        }).then(function (data) {
            this.setState({pageNum : current,pageSize : pageSize,menus:data.result.list});
            message.destroy();
        }.bind(this))
    },
    render : function () {
        var $this = this;
        var columns = [
            {
                title : "用户",
                key : "name",
                render : function (text) {
                    return <a href="javascript:void(0)" onClick={$this._edit.bind(null,text)}>{text.name}</a>
                },
                width:'120px'
            },
            {
                title : "登录名",
                dataIndex : "username",
                key : "username",
                width:'120px'
            },
            {
                title : "微信",
                dataIndex : "wechat",
                key : "wechat",
                width:'120px'
            },
            {
                title : "QQ",
                dataIndex : "qq",
                key : "qq",
                width:'120px'
            },
            {
                title : "电话",
                dataIndex : "phone",
                key : "phone",
                width:'150px'
            },
        ];
        var pagination = {
            total: this.state.menus.length,
            showSizeChanger: true,
            pageSize : this.state.pageSize,
            onShowSizeChange : function(current, pageSize) {
                this.findList(current,pageSize);

            }.bind(this),
            onChange : function(current) {
                this.findList(current,this.state.pageSize);
            }.bind(this),
        };
        var rowSelection = {
            onChange : function(selectedRowKeys, selectedRows) {
                this.setState({selectedRows : selectedRows});
            }.bind(this),
        }
        return <div>
            <SearchForm search={this._search} clear={this._clear}
                        handleChange={this.searchHandleChange} searchModal={this.state.searchModal}/>
            <_Modal record={this.state.record} visible={this.state.visible} loading={this.state.loading} isInsert={this.state.isInsert}
                handleChange={this._handleChange} handleOk = {this.handleOk} handleCancel={this.handleCancel}
                resetPwd={this._resetPwd}/>
            <_RoleModal roles={this.state.roles} targetKeys={this.state.targetKeys} visible={this.state.roleVisible} loading={this.state.roleLoading}
                handleChange={this._handleRoleChange} handleOk = {this.handleRoleOk} handleCancel={this.handleRoleCancel}
            />
            <ButtonList add={this._add} delete={this._delete} assigned={this._assigned}/>
            <Table rowSelection={rowSelection} dataSource={this.state.menus} pagination={pagination} columns={columns} scroll={{ x:2000 }}/>
        </div>
    },
    _edit : function (record) {
        Api.request({
            method :"GET",
            url : Url.FIND_USER_BY_ID,
            data : {id:record.id}
        }).then(function(data){
            this.setState({
                record : data.result,
                visible : true,
                loading : false,
                isInsert : false
            })
        }.bind(this))

    },
    _add : function(){
        this.setState({
            record : {},
            visible : true,
            loading : false,
            isInsert : true
        })
    },
    _delete : function(){

            var selectedRows = this.state.selectedRows;
            if(selectedRows.length == 0){
                message.error('请至少选择一条记录');
                return false;
            }
        swal({
            title: '确定要删除吗？',
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ec6c62',
            cancelButtonColor: '#d33',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        },function() {
            var ids = [];
            for(var i in selectedRows){
                // ids["ids["+i+"]"] = selectedRows[i].id;
                ids.push(selectedRows[i].id);
            }
            message.loading("加载中，请稍后。。。",0);
            Api.request({
                method : 'POST',
                url : Url.DEL_USERS,
                data : {ids:ids}
            }).then(function(result){
                this.findList(this.state.pageNum,this.state.pageSize);
            }.bind(this))
        }.bind(this))

    },
    _resetPwd : function () {
        var id = this.state.record.id;
        Api.request({
            url : Url.RESET_PWD,
            method : "POST",
            data : {id:id}
        }).then(function(data){
            message.info("重置密码成功！！！");
        })
    },
    _handleChange : function(e){
        var record = this.state.record;
        record[e.target.id] = e.target.value;
        this.setState({record:record});
    },
    _search : function(){
        this.findList(this.state.pageNum,this.state.pageSize)
    },
    searchHandleChange : function(e){
        var id = e.target.id;
        id = id.substring(7);
        var searchModal = this.state.searchModal;
        searchModal[id] = e.target.value;
        this.setState({searchModal : searchModal});
    },
    handleCancel : function () {
        this.setState({visible:false,loading:false});
    },
    handleOk : function () {
        this.setState({loading:true});
        var record = this.state.record;
        /**去掉更新时间**/
        record.updateDate = undefined;
        record.insertDate = undefined;
        Api.request({
            method : "POST",
            url : Url.SAVE_USER,
            data : record
        }).then(function(data){
            this.setState({visible:false,loading:false});
            this.findList(this.state.pageNum,this.state.pageSize);
        }.bind(this))
    },
    _clear : function(){
        this.setState({searchModal:{}})
    },
    _assigned : function(){
        var selectedRows = this.state.selectedRows;
        if(selectedRows.length == 0 || selectedRows.length > 1){
            message.error('请选择一条记录');
            return false;
        }
        var userId = selectedRows[0].id;
        Api.request({
            url : Url.GET_ROLES,
            method : "GET",
        }).then(function (data) {
            Api.request({
                url : Url.FIND_USER_ROLES,
                method : "GET",
                data : {userId:userId}
            }).then(function(data1){
                var roles = data.result;
                var _roles = [];
                for(var i in roles){
                    var obj = roles[i];
                    _roles.push({
                        key: obj.id,
                        title: obj.name,
                        description: obj.name,
                    })
                }
                this.setState({roleVisible:true,roleLoading:false,roles:_roles,targetKeys:data1.result,userId:userId})
            }.bind(this))
        }.bind(this))

    },
    _handleRoleChange : function (targetKeys, direction, moveKeys) {
        this.setState({ targetKeys:targetKeys });
    },
    handleRoleOk : function () {
        this.setState({roleLoading:true});
        var userId = this.state.userId;
        Api.request({
            url : Url.ASS_RESOURCES,
            method : "POST",
            data : {ids:this.state.targetKeys,userId:userId}
        }).then(function(data){
            message.info("角色分配成功");
            this.setState({roleVisible:false,roleLoading:false});
        }.bind(this))
    },
    handleRoleCancel : function () {
        this.setState({roleVisible:false,roleLoading:false});
    }
});

var ButtonList = React.createClass({
    render : function(){
        return     <Row type="flex" justify="end" className="ant-btn-list">
            <Col sm={4}><Button key="add" type="primary" onClick={this.props.add}>新增</Button></Col>
            <Col sm={4}><Button key="add" type="primary" onClick={this.props.assigned}>分配权限</Button></Col>
            <Col sm={4}><Button key="delete" onClick={this.props.delete}>删除</Button></Col>
        </Row>
    }
})

var SearchForm = React.createClass({
    render : function(){
        var searchModal = this.props.searchModal;
        return  <Form horizontal  className="ant-advanced-search-form">
            <Row type="flex">
                <Col sm={8}>
                    <FormItem
                        label="用户"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入用户名称" size="default" id="search_name" value={searchModal.name} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="登录名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入链接" size="default" id="search_username" value={searchModal.username} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="电话"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入电话号码" size="default" id="search_phone" value={searchModal.phone} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="QQ"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入QQ" size="default" id="search_qq" value={searchModal.qq} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="wechat"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入微信号" size="default" id="search_wechat" value={searchModal.wechat} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" onClick={this.props.search}>搜索</Button>
                    <Button onClick={this.props.clear}>清除条件</Button>

                </Col>
            </Row>
        </Form>
    }
});

var _Modal = React.createClass({
    render : function(){
        var record = this.props.record;
        var isInsert = this.props.isInsert;
        var loginInfo = [];
        var _reset = '';
        if(isInsert){
            loginInfo.push(<div className="row" key="username">
                <div className="col-xs-4">
                    登录名
                </div>
                <div className="col-xs-8">
                    <Input value={record.username} id="username" onChange={this.props.handleChange}/>
                </div>
            </div>);
        }else{
            loginInfo.push(<div className="row" key="password">
                <div className="col-xs-4">
                    登录名
                </div>
                <div className="col-xs-8">
                    <Input value={record.username} id="username" onChange={this.props.handleChange} readOnly/>
                </div>
            </div>);
            _reset = <Popconfirm title="确定要重置密码吗？" onConfirm={this.props.resetPwd} onCancel={this.cancel} key="resetPwd">
                <a href="#" style={{color:'red'}}>重置密码</a>
            </Popconfirm>;
        }


        return <Modal ref="modal"
                      visible={this.props.visible}
                      title="编辑用户" onOk={this.props.handleOk} onCancel={this.props.handleCancel}
                      footer={[<Button key="back" type="ghost" size="large" onClick={this.props.handleCancel}>返 回</Button>,
            <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.props.handleOk}>
                提 交
            </Button>]}>
            <div style={{float:'right'}}>
                {_reset}
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-4">
                        用户名
                    </div>
                    <div className="col-xs-8">
                        <Input value={record.name} id="name" onChange={this.props.handleChange}/>
                    </div>
                </div>
                {loginInfo}
                <div className="row">
                    <div className="col-xs-4">
                        微信
                    </div>
                    <div className="col-xs-8">
                        <Input value={record.wechat} id="wechat" onChange={this.props.handleChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        QQ
                    </div>
                    <div className="col-xs-8">
                        <Input value={record.qq} id="qq" onChange={this.props.handleChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-4">
                        电话
                    </div>
                    <div className="col-xs-8">
                        <Input value={record.phone} id="phone" onChange={this.props.handleChange}/>
                    </div>
                </div>
            </div>
        </Modal>
    },
    cancel : function () {
        
    }
});

var _RoleModal = React.createClass({
    render : function () {
        return <Modal ref="modal"
                      visible={this.props.visible}
                      title="分配角色" onOk={this.props.handleOk} onCancel={this.props.handleCancel}
                      footer={[<Button key="back" type="ghost" size="large" onClick={this.props.handleCancel}>返 回</Button>,
            <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.props.handleOk}>
                提 交
            </Button>]}>
            <Transfer
                dataSource={this.props.roles}
                targetKeys={this.props.targetKeys}
                onChange={this.props.handleChange}
                render={item => item.title}
            />
        </Modal>
    }
})

module.exports = User;