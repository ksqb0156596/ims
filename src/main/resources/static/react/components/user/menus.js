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
require("../../css/searchForm.css");



var Menus = React.createClass({
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
            selectedRows : []
        }
    },
    findList : function(current,pageSize){
        Api.request({
            method : "GET",
            url : Url.FIND_RESOURCE_LIST,
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
                title : "id",
                dataIndex : "id",
                key : "id",
                width:'120px'
            },
            {
                title : "名称",
                key : "name",
                render : function (text) {
                    return <a href="javascript:void(0)" onClick={$this._edit.bind(null,text)}>{text.name}</a>
                },
                width:'120px'
            },
            {
                title : "链接",
                dataIndex : "url",
                key : "url",
                width:'120px'
            },
            {
                title : "图标",
                dataIndex : "icon",
                key : "icon",
                width:'120px'
            },
            {
                title : "父级ID",
                dataIndex : "parentId",
                key : "parentId",
                width:'120px'
            },
            {
                title : "排序",
                dataIndex : "sort",
                key : "sort",
                width:'120px'
            },
            {
                title : "类型",
                key : "type",
                render : function(text){
                    var _typeName = '';
                    switch (text.type) {
                        case 1 : _typeName = '菜单';break;
                        case 2 : _typeName = '页面';break;
                        case 3 : _typeName = '按钮';break;
                    }
                    return _typeName;
                },
                width:'120px'

            }
        ];
        var pagination = {
            total: this.state.menus.length,
            showSizeChanger: true,pageSize : this.state.pageSize,
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

        var type = (record.type ? record.type : 1);

        var _Modal = '';
        if(this.state.visible){
            _Modal = <Modal ref="modal"
                            visible={this.state.visible}
                            title="编辑菜单" onOk={this.handleOk} onCancel={this.handleCancel}
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
                            链接
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.url} id="url" onChange={this._handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            图标
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.icon} id="icon" onChange={this._handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            父级ID
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.parentId} id="parentId" onChange={this._handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            排序
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.sort} id="sort" onChange={this._handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            类型
                        </div>
                        <div className="col-xs-8">
                            <Select id="type" value={type.toString()} style={{ width: 120 }} onChange={this._handleSelectChange}>
                                <Option key="1" value="1">菜单</Option>
                                <Option key="2" value="2">页面</Option>
                                <Option key="3" value="3">按钮</Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </Modal>
        }
        return <div>
                <SearchForm search={this._search} clear={this._clear}
                            handleChange={this.searchHandleChange} searchModal={this.state.searchModal}/>
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
                url: Url.DEL_RESOURCES,
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
    _handleSelectChange : function (value) {
        var record = this.state.record;
        record.type = value;
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
        Api.request({
            method : "POST",
            url : Url.SAVE_RESOURCES,
            data : this.state.record
        }).then(function(data){
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
        var searchModal = this.props.searchModal;
       return  <Form horizontal  className="ant-advanced-search-form">
            <Row type="flex">
                <Col sm={8}>
                    <FormItem
                        label="ID"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入ID" size="default" id="search_id" value={searchModal.id} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="名称"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入名称" size="default" id="search_name" value={searchModal.name} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="链接"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入链接" size="default" id="search_url" value={searchModal.url} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="父级ID"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入父级ID" size="default" id="search_parentId" value={searchModal.parentId} onChange={this.props.handleChange}/>
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