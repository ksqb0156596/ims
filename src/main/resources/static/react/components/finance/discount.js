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
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
var Api = require("../../utils/api-utils");
var Url = require("../../commons/api");
var dateUtils = require("../../commons/dateUtils");
var swal = require('sweetalert');
require("../../css/searchForm.css");



var Menus = React.createClass({
    componentWillMount : function () {
        this.findList(1,20);
    },
    getInitialState : function(){
        return {menus : [],
            loading: false,
            visible: false,
            record : {},
            levels : [],
            pageNum:1,
            pageSize:20,
            searchModal : {},
            selectedRows : [],
            gameList : [],
            platformList : []
        }
    },
    findList : function(current,pageSize){
        Api.request({
            method : "GET",
            url : Url.FIND_DISCOUNT_LIST,
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
                title : "平台名称",
                key : "name",
                render : function (text) {
                    return <a href="javascript:void(0)" onClick={$this._edit.bind(null,text)}>{text.platformName}</a>
                },
                width:'120px'
            },
            {
                title : "游戏名称",
                key : "gameName",
                dataIndex : "gameName",
                width:'120px'
            },
            {
                title : "充值类型",
                key : "rechargeType",
                width:'120px',
                render : function (text) {
                    switch (text.rechargeType){
                        case 0 : return "首充";
                        case 1 : return "续充";
                        default : return "";
                    }
                    
                }
            },
            {
                title : "折扣",
                key : "point",
                dataIndex : "point",
                width:'120px'
            },
            {
                title : "成本折扣",
                key : "realPoint",
                dataIndex : "realPoint",
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
            _Modal = <Modal ref="modal"
                            visible={this.state.visible}
                            title="编辑交易途径" onOk={this.handleOk} onCancel={this.handleCancel}
                            footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返 回</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                      提 交
                    </Button>
                  ]}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4">
                            游戏
                        </div>
                        <div className="col-xs-8">
                            <Select
                                combobox
                                value={this.state.record.gameName}
                                placeholder="请输入游戏名称"
                                notFoundContent="没有匹配项"
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onChange={this.handleGameChange.bind(null,"game")}
                                onSelect={this._handleGameSelectChange.bind(null,"game")}
                                style={{width:'100%'}}
                            >
                                {gameOptions}
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            平台
                        </div>
                        <div className="col-xs-8">
                            <Select
                                combobox
                                value={this.state.record.platformName}
                                placeholder="请输入平台名称"
                                notFoundContent="没有匹配项"
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onChange={this.handleGameChange.bind(null,"platform")}
                                onSelect={this._handleGameSelectChange.bind(null,"platform")}
                                style={{width:'100%'}}
                            >
                                {platformOptions}
                            </Select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            充值类型
                        </div>
                        <div className="col-xs-8">
                            <RadioGroup onChange={this._handleChange.bind(null,"rechargeType")} name="rechargeType" value={record.rechargeType + ""}>
                                <RadioButton value="0">首充</RadioButton>
                                <RadioButton value="1">续充</RadioButton>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-4">
                            折扣(1-10包含两位小数点)
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.point} id="point" onChange={this._handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4">
                            成本折扣(1-10包含两位小数点)
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.realPoint} id="realPoint" onChange={this._handleChange}/>
                        </div>
                    </div>
                </div>
            </Modal>
        }
        return <div>
            <SearchForm search={this._search} clear={this._clear}
                        handleChange={this.searchHandleChange} searchModal={this.state.searchModal} levels={this.state.levels}/>
            {_Modal}
            <ButtonList add={this._add} delete={this._delete}/>
            <Table rowSelection={rowSelection} dataSource={this.state.menus} pagination={pagination} columns={columns} scroll={{ x:true }}/>
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
                url: Url.DEL_DISCOUNT,
                data: {ids: ids}
            }).then(function (result) {
                this.findList(this.state.pageNum, this.state.pageSize);
            }.bind(this))
        }.bind(this))
    },
    _handleChange : function(e,name){
        var record = this.state.record;
        if(name){
            record[e] = name.target.value;
        }else{
            record[e.target.id] = e.target.value;
        }
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
    searchHandleChange : function(e,name){
        var searchModal = this.state.searchModal;
        if(name){
            searchModal[e] = name.target.value;
        }else{
            var id = e.target.id;
            id = id.substring(7);
            searchModal[id] = e.target.value;
        }
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
            url : Url.SAVE_DISCOUNT,
            data : record
        }).then(function(data){
            this.setState({visible:false,loading:false});
            this.findList(this.state.pageNum,this.state.pageSize);
        }.bind(this))
    },
    _clear : function(){
        this.setState({searchModal:{}})

    },
    handlePlatformChange : function () {
        
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
    _handleGameSelectChange : function (name,value,option) {
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
        var searchModal = this.props.searchModal;
        return  <Form horizontal  className="ant-advanced-search-form">
            <Row type="flex">
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
                        label="平台名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入平台名" size="default" id="search_platformName" value={searchModal.platformName} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="充值类型"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <RadioGroup onChange={this.props.handleChange.bind(null,"rechargeType")} name="rechargeType" value={searchModal.rechargeType}>
                            <RadioButton value="0">首充</RadioButton>
                            <RadioButton value="1">续充</RadioButton>
                        </RadioGroup>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="折扣"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input type="number" placeholder="请输入折扣" size="default" id="search_point" value={searchModal.point} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="成本折扣"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input type="number" placeholder="请输入成本折扣" size="default" id="search_realPoint" value={searchModal.realPoint} onChange={this.props.handleChange}/>
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