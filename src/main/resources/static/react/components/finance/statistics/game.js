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
import { DatePicker } from 'antd';
import { Form, Row, Col } from 'antd';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
var Api = require("../../../utils/api-utils");
var Url = require("../../../commons/api");
var dateUtils = require("../../../commons/dateUtils");
var swal = require('sweetalert');



var Menus = React.createClass({
    componentWillMount : function () {
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
            searchModal : {key:"game"},
            selectedRows : []
        }
    },
    findList : function(current,pageSize){
        Api.request({
            method : "GET",
            url : Url.STATISTICS,
            data : _.extend({pageNum:current,pageSize:pageSize},this.state.searchModal)
        }).then(function (data) {
            this.setState({pageNum : current,pageSize : pageSize,menus:data.list,total:data.total});
            message.destroy();
        }.bind(this))
    },
    render : function () {
        var columns = [
            {
                title : "游戏名",
                key : "name",
                dataIndex : "name",
                width:'120px'
            },
            {
                title : "交易笔数",
                dataIndex : "num",
                key : "num",
                width:'120px'
            },
            {
                title : "充值原价",
                dataIndex : "denomination",
                key : "denomination",
                width:'120px'
            },
            {
                title : "交易流水",
                dataIndex : "trading",
                key : "trading",
                width:'120px'
            },
            {
                title : "成本流水",
                dataIndex : "cost",
                key : "cost",
                width:'200px'
            },
            {
                title : "利润",
                dataIndex : "profit",
                key : "profit",
                width:'120px'
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
        return <div>
            <SearchForm search={this._search} handleTimeChange={this.handleTimeChange}
                        handleChange={this.searchHandleChange} searchModal={this.state.searchModal}/>
            <Table rowSelection={rowSelection} dataSource={this.state.menus} pagination={pagination} columns={columns} scroll={{ x:2000 }}/>
        </div>
    },
    _search : function(){
        this.props.update(this.state.searchModal);
        this.findList(this.state.pageNum,this.state.pageSize)
    },
    searchHandleChange : function(e){
        var id = e.target.id;
        id = id.substring(7);
        var searchModal = this.state.searchModal;
        searchModal[id] = e.target.value;
        this.setState({searchModal : searchModal});
    },
    handleTimeChange : function (dates, dateStrings) {
        var searchModal = this.state.searchModal;
        searchModal.startDate = dateStrings[0];
        searchModal.endDate = dateStrings[1];
        this.setState({searchModal : searchModal});
    }
});

var SearchForm = React.createClass({

    render : function(){
        var searchModal = this.props.searchModal;
        return  <Form horizontal  className="ant-advanced-search-form">
            <Row type="flex">
                <Col sm={6}>
                    <FormItem
                        label="游戏名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入游戏名" size="default" id="search_name" value={searchModal.name} onChange={this.props.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={12}>
                    <FormItem
                        label="订单时间范围"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <RangePicker style={{ width: 200 }} onChange={this.props.handleTimeChange} />
                    </FormItem>
                </Col>

                <Col sm={6} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" onClick={this.props.search}>搜索</Button>
                </Col>
            </Row>
        </Form>
    }
})

module.exports = Menus;