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
            total:0,
            pageNum:1,
            pageSize:20,
            searchModal : {},
            selectedRows : []
        }
    },
    findList : function(current,pageSize){
        Api.request({
            method : "GET",
            url : Url.FIND_TRADING_LIST,
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
                title : "交易途径",
                key : "name",
                render : function (text) {
                    return <a href="javascript:void(0)" onClick={$this._edit.bind(null,text)}>{text.name}</a>
                },
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
                            交易途径
                        </div>
                        <div className="col-xs-8">
                            <Input value={record.name} id="name" onChange={this._handleChange}/>
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
                url: Url.DEL_TRADING,
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
        var record = this.state.record;
        record.updateDate = undefined;
        record.insertDate = undefined;
        Api.request({
            method : "POST",
            url : Url.SAVE_TRADING,
            data : record
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
                        label="交易途径"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入交易途径" size="default" id="search_name" value={searchModal.name} onChange={this.props.handleChange}/>
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