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



var Menus = React.createClass({
    componentWillMount : function () {
        this.findList(1,20);
        Api.request({
            url : Url.FIND_LEVEL_LIST,
            method:"GET",
            data:{pageSize:0}
        }).then(function (data) {
            this.setState({levels:data.result.list})
        }.bind(this))
    },
    getInitialState : function(){
        return {menus : [],
            loading: false,
            visible: false,
            record : {},
            levels : [],
            total:0,
            pageNum:1,
            pageSize:20,
            searchModal : {status:1},
            selectedRows : [],
        }
    },
    findList : function(current,pageSize){
        Api.request({
            method : "GET",
            url : Url.FIND_CLIENT_LIST,
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
                title : "客户名",
                key : "name",
                render : function (text) {
                    return <a href="javascript:void(0)" onClick={$this._edit.bind(null,text)}>{text.name}</a>
                },
                width:'120px'
            },
            {
                title : "旺旺账号",
                dataIndex : "aliWang",
                key : "aliWang",
                width:'120px'
            },
            {
                title : "微信",
                dataIndex : "wechat",
                key : "wechat",
                width:'120px'
            },
            {
                title : "电话",
                dataIndex : "phone",
                key : "phone",
                width:'120px'
            },
            {
                title : "QQ",
                dataIndex : "qq",
                key : "qq",
                width:'120px'
            },
            {
                title : "总金额",
                dataIndex : "totalMoney",
                key : "totalMoney",
                width:'120px'
            },
            {
                title : "客户等级",
                dataIndex : "levelName",
                key : "levelName",
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
            _Modal = <Modal ref="modal"
                            visible={this.state.visible}
                            title="编辑用户" onOk={this.handleOk} onCancel={this.handleCancel}
                            footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                      提 交
                    </Button>
                  ]}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4">
                            名称
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.name} id="name" onChange={this._handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            旺旺账号
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.aliWang} id="aliWang" onChange={this._handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            微信
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.wechat} id="wechat" onChange={this._handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            QQ
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.qq} id="qq" onChange={this._handleChange}/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-xs-4">
                            客户状态
                        </div>
                        <div className="col-xs-8">
                            <Select style={{width:'100%'}} value={(record.status?record.status.toString() : "1")} onChange={this._handleSelectChange.bind(null,"status")}>
                                <Option value="1">正常</Option>
                                <Option value="1111">灰名单</Option>
                                <Option value="3333">黑名单</Option>
                                <Option value="9999">已删除</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            等级
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.levelName} id="levelName" disabled/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            总金额
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.totalMoney} id="totalMoney" disabled/>
                        </div>
                    </div>

                </div>
            </Modal>
        }
        return <div>
            <SearchForm search={this._search} clear={this._clear}
                        handleChange={this.searchHandleChange} handleSelectChange={this.searchHandleSelectChange} searchModal={this.state.searchModal} levels={this.state.levels}/>
            {_Modal}
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
            for (var i in selectedRows) {
                // ids["ids["+i+"]"] = selectedRows[i].id;
                ids.push(selectedRows[i].id);
            }
            message.loading("加载中，请稍后。。。", 0);
            Api.request({
                method: 'POST',
                url: Url.DEL_CLIENT,
                data: {ids: ids}
            }).then(function (result) {
                this.findList(this.state.pageNum, this.state.pageSize);
            }.bind(this))
        }.bind(this))
    },
    _handleChange : function(e){
        var record = this.state.record;
        record[e.target.id] = e.target.value;
        this.setState({record:record});
    },
    _handleSelectChange : function (id,value) {
        var record = this.state.record;
        record[id] = value;
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
    searchHandleSelectChange : function (id,value) {
        var searchModal = this.state.searchModal;
        searchModal[id] = value;
        this.setState({searchModal:searchModal});
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
            url : Url.SAVE_CLIENT,
            data : record
        }).then(function(data){
            if(data.status == 0){
                swal({title:"保存失败",
                    text:"信息重复，请确认。已存在用户："+data.result.name +"\n"
                    +"旺旺:" + data.result.aliWang + "\n"
                    +"qq:" + data.result.qq + "\n"
                    +"电话:" + data.result.phone + "\n"
                    +"wechat:" + data.result.wechat + "\n",
                    type:"error"
                });
                return false;
            }
            this.setState({visible:false,loading:false});
            this.findList(this.state.pageNum,this.state.pageSize);
        }.bind(this))
    },
    _clear : function(){
        this.setState({searchModal:{}})
    }
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
        var searchModal = this.props.searchModal;
        var levelId = (searchModal.levelId ? searchModal.levelId:-1);
        return  <Form horizontal  className="ant-advanced-search-form">
            <Row type="flex">
                <Col sm={8}>
                    <FormItem
                        label="客户名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入客户名" size="default" id="search_name" value={searchModal.name} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="旺旺账号"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入旺旺账号" size="default" id="search_aliWang" value={searchModal.aliWang} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="微信"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入微信" size="default" id="search_wechat" value={searchModal.wechat} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="电话"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入电话" size="default" id="search_phone" value={searchModal.phone} onChange={this.props.handleChange}/>
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
                        label="等级"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select id="levelId" value={levelId.toString()} style={{ width: '100%' }} onChange={this.props.handleSelectChange.bind(null,"levelId")}>
                            {options}
                        </Select>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="用户状态"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select style={{width:'100%'}} value={(searchModal.status?searchModal.status.toString() : "1")} onChange={this.props.handleSelectChange.bind(null,"status")}>
                            <Option value="1">正常</Option>
                            <Option value="1111">灰名单</Option>
                            <Option value="3333">黑名单</Option>
                            <Option value="9999">已删除</Option>
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