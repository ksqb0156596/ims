/**
 * Created by Administrator on 2016/9/4.
 */
var React = require('react');
var _ = require('underscore');
import {Table} from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Modal } from 'antd';
import { Select } from 'antd';
import { message } from 'antd';
import { Form, Row, Col } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
var Api = require("../../utils/api-utils");
var Url = require("../../commons/api");
var dateUtils = require("../../commons/dateUtils");
require("../../css/searchForm.css");

var Client = require('./search-client');



var Menus = React.createClass({
    componentWillMount : function () {
        this.findList(1,20);
        Api.request({
            url : Url.FIND_USER_LIST,
            method : "GET",
            data : {pageNum:1,pageSize:0}
        }).then(function (data1) {
            this.setState({users:data1.result.list})
        }.bind(this))
    },
    getInitialState : function(){
        return {menus : [],
            loading: false,
            visible: false,
            record : {},
            levels : [],
            pageNum:1,
            pageSize:20,
            total:0,
            searchModal : {},
            selectedRows : [],
            clientVisible : false,
            clientLoading : false,
            platformList : [],
            gameList : [],
            users : []

        }
    },
    findList : function(current,pageSize){
        Api.request({
            method : "GET",
            url : Url.FIND_ACCOUNT_LIST,
            data : _.extend({pageNum:current,pageSize:pageSize},this.state.searchModal)
        }).then(function (data) {
            this.setState({pageNum : current,pageSize : pageSize,menus:data.result.list,total:data.result.total});
            message.destroy();
        }.bind(this))
    },
    render : function () {
        var $this = this;
        var columns = [
            {
                title : "账号",
                key : "name",
                render : function (text) {
                    return <a href="javascript:void(0)" onClick={$this._edit.bind(null,text)}>{text.name}</a>
                },
                width:'120px'
            },
            {
                title : "初始密码",
                dataIndex : "password",
                key : "password",
                width:'120px'
            },
            {
                title : "游戏",
                dataIndex : "gameName",
                key : "gameName",
                width:'120px'
            },
            {
                title : "平台",
                dataIndex : "platformName",
                key : "platformName",
                width:'120px'
            },
            {
                title : "所属客户",
                dataIndex : "clientName",
                key : "clientName",
                width:'120px'
            },
            {
                title : "账号归属人",
                dataIndex : "userName",
                key : "userName",
                width:'120px'
            },
            {
                title : "更新人",
                dataIndex : "updateUser",
                key : "updateUser",
                width:'120px'
            },
            {
                title : "更新时间",
                render : function (text) {
                    return dateUtils.format(new Date(text.updateDate),"yyyy-MM-dd hh:mm:ss")
                },
                key : "updateDate",
                width:'200px'
            },
            {
                title : "创建人",
                dataIndex : "insertUser",
                key : "insertUser",
                width:'120px'
            },
            {
                title : "创建时间",
                render : function (text) {
                    return dateUtils.format(new Date(text.insertDate),"yyyy-MM-dd hh:mm:ss")
                },
                key : "createDate",
                width:'200px'
            },

        ];
        var pagination = {
            total: this.state.total,
            pageSize : this.state.pageSize,
            current : this.state.pageNum,
            showSizeChanger: true,
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

        var record = this.state.record;
        var _Modal = '';
        if(this.state.visible){
            var platformOptions = [];
            var platformList = this.state.platformList;
            for(var i in platformList){
                platformOptions.push(<Option key={"p" + platformList[i].id} name={platformList[i].id} value={platformList[i].name}>{platformList[i].name}</Option>);
            }
            var gameOptions = [];
            var gameList = this.state.gameList;
            for(var i in gameList){
                gameOptions.push(<Option key={"g" + gameList[i].id} name={gameList[i].id} value={gameList[i].name}>{gameList[i].name}</Option>);
            }
            var userOptions = [];
            var userList = this.state.users;
            for(var i in userList){
                userOptions.push(<Option key={"u" + userList[i].id} name={userList[i].id} value={userList[i].id}>{userList[i].name}</Option>);
            }
            _Modal = <Modal ref="modal"
                            visible={this.state.visible}
                            title="编辑用户" onOk={this.handleOk} onCancel={this.handleCancel}
                            footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                      提 交
                    </Button>
                  ]}>
                <Form horizontal>
                    <FormItem
                        id="name"
                        label="账号"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}

                    >
                        <Input value={record.name} id="name" onChange={this._handleChange}/>
                    </FormItem>
                    <FormItem
                        id="password"
                        label="初始密码"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}

                    >
                        <Input value={record.password} id="password" onChange={this._handleChange}/>
                    </FormItem>
                    <FormItem
                        id="gameName"
                        label="游戏名"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select
                            combobox
                            value={record.gameName}
                            placeholder="请输入游戏名称"
                            notFoundContent="没有匹配项"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onChange={this.handleGameChange.bind(null,"game")}
                            onSelect={this.handleGameSelectChange.bind(null,"game")}
                            style={{width:'100%'}}
                        >
                            {gameOptions}
                        </Select>
                    </FormItem>
                    <FormItem
                        id="platformName"
                        label="平台"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select
                            combobox
                            value={record.platformName}
                            placeholder="请输入平台名称"
                            notFoundContent="没有匹配项"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onChange={this.handleGameChange.bind(null,"platform")}
                            onSelect={this.handleGameSelectChange.bind(null,"platform")}
                            style={{width:'100%'}}
                        >
                            {platformOptions}
                        </Select>
                    </FormItem>
                    <FormItem
                        id="clientName"
                        label="归属客户"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input value={record.clientName} id="clientName" readOnly={true} onClick={this.findClients}/>

                    </FormItem>
                    <FormItem
                        id="userName"
                        label="归属员工"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select style={{width:'100%'}} value={record.userId} onChange={this._handleSelectChange}>
                            {userOptions}
                        </Select>
                    </FormItem>

                </Form>
            </Modal>
        }
        return <div>
            <SearchForm search={this._search} clear={this._clear} users={this.state.users} handleSelectChange={this._handleSearchSelectChange}
                        handleChange={this.searchHandleChange} searchModal={this.state.searchModal}/>
            {_Modal}
            {this.state.clientVisible ? <Client visible={this.state.clientVisible} loading={this.state.clientLoading} clientId={record.clientId}
                handleOk = {this.clientHandleOk} handleCancel={this.clientHandleCancel}
                />:''}
            <ButtonList add={this._add} delete={this._delete}/>
            <Table rowSelection={rowSelection} dataSource={this.state.menus} pagination={pagination} columns={columns} scroll={{ x:2000 }}/>
        </div>
    },
    _edit : function (record) {
        this.setState({
            record : record,
            visible : true,
            loading : false
        })
    },
    _add : function(){
        this.setState({
            record : {},
            visible : true,
            loading : false
        })
    },
    _delete : function(){
        var selectedRows = this.state.selectedRows;
        if(selectedRows.length == 0){
            message.error('请至少选择一条记录');
            return false;
        }
        var ids = [];
        for(var i in selectedRows){
            // ids["ids["+i+"]"] = selectedRows[i].id;
            ids.push(selectedRows[i].id);
        }
        message.loading("加载中，请稍后。。。",0);
        Api.request({
            method : 'POST',
            url : Url.DEL_ACCOUNT,
            data : {ids:ids}
        }).then(function(result){
            this.findList(this.state.pageNum,this.state.pageSize);
        }.bind(this))
    },
    _handleChange : function(e){
        var record = this.state.record;
        record[e.target.id] = e.target.value;
        this.setState({record:record});
    },
    _handleSelectChange : function (value) {
        var record = this.state.record;
        record.userId = value;
        this.setState({record:record});
    },
    _handleSearchSelectChange : function (value) {
        var searchModal = this.state.searchModal;
        searchModal.userId = value;
        this.setState({searchModal:searchModal});
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
        record.updateDate = undefined;
        record.insertDate = undefined;
        Api.request({
            method : "POST",
            url : Url.SAVE_ACCOUNT,
            data : this.state.record
        }).then(function(data){
            this.setState({visible:false,loading:false});
            this.findList(this.state.pageNum,this.state.pageSize);
        }.bind(this))
    },
    _clear : function(){
        this.setState({searchModal:{}})
    },
    findClients : function (e) {
        this.setState({
            clientVisible : true
        })
    },
    clientHandleOk : function (client) {
        this.setState({
            clientLoading : true
        });
        if(client.id){
            var record = this.state.record;
            record.clientName = client.name;
            record.clientId = client.id;
            this.setState({record:record,clientLoading:false,clientVisible:false});
        }else{
            client.updateDate = undefined;
            client.insertDate = undefined;
            Api.request({
                method : "POST",
                url : Url.SAVE_CLIENT,
                data : client,
            }).then(function (data) {
                if(data.status == 1){
                    client = data.result;
                    var record = this.state.record;
                    record.clientName = client.name;
                    record.clientId = client.id;
                    this.setState({record:record,clientLoading:false,clientVisible:false});
                }
            }.bind(this))
        }

    },
    clientHandleCancel : function () {
        this.setState({
            clientVisible : false,
            clientLoading : false
        })
    },
    handleGameChange : function (name,value) {
        var record = this.state.record;
        record[name+"Name"] = value;
        this.setState({record : record})
        if(value.length > 0) {
            Api.request({
                url: Url["SEARCH_"+name.toLocaleUpperCase()],
                method: "GET",
                data: {search: value}
            }).then(function (data) {
                if(name == 'platform'){
                    this.setState({platformList: data.result})
                }else if(name == 'game'){
                    this.setState({gameList: data.result})
                }

            }.bind(this))
        }
    },
    handleGameSelectChange : function (name,value,option) {
        var record = this.state.record;
        record[name + "Id"] = option.props.name;
        record[name + "Name"] = value;
        this.setState({record:record});
    },
});

var ButtonList = React.createClass({
    render : function(){
        return     <Row type="flex" justify="end" className="ant-btn-list">
            <Col sm={4}><Button key="add" type="primary" onClick={this.props.add}>新增</Button></Col>
            <Col sm={4}><Button key="delete" onClick={this.props.delete}>删除</Button></Col>
        </Row>
    }
})

var SearchForm = React.createClass({

    render : function(){
        var levels = this.props.levels;
        var options = [];
        options.push(<Option key="-1" value="-1">==请选择等级==</Option>)
        for(var i in levels){
            var obj = levels[i];
            options.push(<Option key={obj.id} value={obj.id}>{obj.name+":"+obj.minAmount+"~"+obj.maxAmount}</Option>)
        }
        var userOptions = [];
        var userList = this.props.users;
        for(var i in userList){
            userOptions.push(<Option key={"u" + userList[i].id} name={userList[i].id} value={userList[i].id}>{userList[i].name}</Option>);
        }
        var searchModal = this.props.searchModal;
        return  <Form horizontal  className="ant-advanced-search-form">
            <Row type="flex">
                <Col sm={8}>
                    <FormItem
                        label="账号"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入账号" size="default" id="search_name" value={searchModal.name} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="所属客户名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入所属客户名" size="default" id="search_clientName" value={searchModal.clientName} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="平台名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入平台名" size="default" id="search_platformName" value={searchModal.platformName} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="游戏名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入游戏名" size="default" id="search_gameName" value={searchModal.gameName} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="归属员工"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select allowClear={true} style={{width:'100%'}} value={searchModal.userId} onChange={this.props.handleSelectChange}>
                            {userOptions}
                        </Select>
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
})

module.exports = Menus;