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
import { Icon  } from 'antd';
import { message } from 'antd';
import { Form, Row, Col } from 'antd';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
var Forms = require("./order-form");
var SearchForm = require('./order-search');
var Api = require("../../utils/api-utils");
var Url = require("../../commons/api");
var Upload = require("../commons/upload");
var dateUtils = require("../../commons/dateUtils");
var swal = require('sweetalert');
require("../../css/searchForm.css");



var Menus = React.createClass({
    componentWillMount : function () {
        this.findList(1,20);
        var statusOptions = [];
        statusOptions.push(<Option key="1" value="1">待付款</Option>);
        statusOptions.push(<Option key="2" value="2">待充值</Option>);
        statusOptions.push(<Option key="3" value="3">待收货</Option>);
        statusOptions.push(<Option key="4" value="4">交易完成</Option>);
        statusOptions.push(<Option key="5" value="5">已评价</Option>);
        statusOptions.push(<Option key="3333" value="3333">已退款</Option>);
        statusOptions.push(<Option key="9999" value="9999">已取消</Option>);
        Api.request({
            url : Url.FIND_USER_LIST,
            data : {pageNum:1,pageSize:0}
        }).then(function(data){
            Api.request({
                method : "GET",
                data : {pageSize:0},
                url : Url.FIND_TRADING_LIST
            }).then(function (data1) {
                this.setState({tradingList : data1.result.list,statusOptions:statusOptions,users:data.result.list});
            }.bind(this))
        }.bind(this))

    },
    getInitialState : function() {
        return {
            menus: [],
            loading: false,
            visible: false,
            record: {},
            levels: [],
            pageNum: 1,
            pageSize: 20,
            searchModel: {},
            selectedRows: [],
            users: [],
            statusOptions : [],
            gameList:[],
            platformList:[],
            accountList : [],
            tradingList : [],
            total:0,
            uploadVisible : false,
            validate :{
                clientName : "",
                gameId : "",
                gameMsg : "",
                platformId : "",
                platformMsg : "",
                discountId : "",
                point : "",
                denomination : "",
                status : "",
            }
        }

    },
    findList : function(current,pageSize,record){
        if(!record){
            record = this.state.searchModel;
        }
        Api.request({
            method : "GET",
            url : Url.FIND_ORDERS,
            data : _.extend({pageNum:current,pageSize:pageSize},record)
        }).then(function (data) {
            this.setState({pageNum: current, pageSize: pageSize, menus: data.result.list,searchModel:record,uploadVisible:false,total:data.result.total});
            message.destroy();
        }.bind(this))
    },
    render : function () {
        var $this = this;
        var columns = [
            {
                title : "订单号",
                key : "orderNo",
                render : function (text) {
                    return <a href="javascript:void(0)" onClick={$this._edit.bind(null,text)}>{text.orderNo}</a>
                },
                width:'250px'
            },
            {
                title : "订单日期",
                dataIndex : "orderDate",
                key : "orderDate",
                width:'120px'
            },
            {
                title : "客户名",
                dataIndex : "clientName",
                key : "clientName",
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
                title : "账号",
                dataIndex : "accountName",
                key : "accountName",
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
                title : "付款方式",
                dataIndex : "tradingName",
                key : "tradingName",
                width:'120px'
            },
            {
                title : "游戏原价(面值)",
                dataIndex : "denomination",
                key : "denomination",
                width:'120px'
            },
            {
                title : "交易价格",
                dataIndex : "tradingPrice",
                key : "tradingPrice",
                width:'120px'
            },
            {
                title : "充值成本",
                dataIndex : "productionPrice",
                key : "productionPrice",
                width:'120px'
            },
            {
                title : "折扣",
                dataIndex : "point",
                key : "point",
                width:'120px'
            },
            {
                title : "成本折扣",
                dataIndex : "realPoint",
                key : "realPoint",
                width:'120px'
            },
            {
                title : "利润",
                dataIndex : "profit",
                key : "profit",
                width:'120px'
            },
            {
                title : "充值处理人",
                dataIndex : "directorName",
                key : "directorName",
                width:'120px'
            },
            {
                title : "客户归属人",
                dataIndex : "clientBelong",
                key : "clientBelong",
                width:'120px'
            },
            {
                title : "订单状态",
                key : "status",
                width:'120px',
                render : function (text) {
                    switch (text.status){
                        case 1 : return "待付款";
                        case 2 : return "待充值";
                        case 3 : return "待收货";
                        case 4 : return "交易完成";
                        case 5 : return "已评价";
                        case 3333 : return "已退款";
                        case 9999 : return "已取消";
                    }
                }
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
            current : this.state.pageNum,
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
            type : 'radio',
            onChange : function(selectedRowKeys, selectedRows) {
                this.setState({selectedRows : selectedRows});
            }.bind(this),
        }
        var _Modal = '';
        if(this.state.visible){
            _Modal = <Forms visible={this.state.visible} loading={this.state.loading} record={this.state.record} validate={this.state.validate}
                            gameList={this.state.gameList} platformList={this.state.platformList} tradingList={this.state.tradingList} statusOptions={this.state.statusOptions} users={this.state.users}
                            handleCancel = {this.handleCancel} handleOk={this.handleOk} handleChange={this._handleChange} findClients={this.findClients}
                            handleGameChange = {this.handleGameChange} handleGameSelectChange={this.handleGameSelectChange} handleSelectChange={this._handleSelectChange}
                            clientHandleOk = {this.clientHandleOk} handleBlur={this.handleBlur}
            />
        }
        var _upload = '';
        if(this.state.uploadVisible){
            var $this = this;
            var upload = {
                    name: 'file',
                    showUploadList: false,
                    action: '/ims/orders/upload',
                    accept : '.xls',
                    onChange : function (info) {
                    if (info.file.status !== 'uploading') {
                        message.loading('上传中请稍后', 0)
                    }
                    if (info.file.status === 'done') {
                        message.destroy();
                        if(info.file.response.status == 0){
                            Modal.error({
                                title : "文件上传失败",
                                content : info.file.response.msg
                            })
                            return false;
                        }
                        message.success(`文件上传成功`);
                        $this.findList(1,20);
                    } else if (info.file.status === 'error') {
                        message.error("文件上传失败")
                    }
                },
            };
            _upload = <Upload handleCancel={this.onUploadCancel} visible={this.state.uploadVisible}
                        upload = {upload}/>;
        }
        return <div>
            <SearchForm search={this._search}
                        statusOptions={this.statusOptions} users={this.state.users}/>
            {_Modal}
            {_upload}
            <ButtonList add={this._add} delete={this._delete} showUpload={this.showUpload} download={this.download}/>
            <Table useFixedHeader={true} rowSelection={rowSelection} dataSource={this.state.menus} pagination={pagination} columns={columns} scroll={{ x:3000 }}/>
        </div>
    },
    showUpload : function () {
        this.setState({uploadVisible:true});
    },

    onUploadCancel : function () {
        this.setState({uploadVisible:false});
    },

    download : function () {
        Api.download(this.state.searchModel,Url.EXPORT_ORDER);
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
            record : {orderNo:"自动生成",},
            visible : true,
            loading : false
        })
    },
    _delete : function(){
        var selectedRows = this.state.selectedRows;
        if(selectedRows.length == 0 || selectedRows.length > 1){
            message.error('请选择一条记录');
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
            message.loading("加载中，请稍后。。。", 0);
            var order = selectedRows[0];
            Api.request({
                method: 'POST',
                url: Url.DEL_ORDER,
                data: {id:order.id}
            }).then(function (result) {
                this.findList(this.state.pageNum, this.state.pageSize);
                this.setState({selectedRows : []});
            }.bind(this))
        }.bind(this))
    },
    handleBlur : function () {
        var record = this.state.record;
        var validate = this.state.validate;
        if(record.rechargeType == 1 && record.accountName){
            Api.request({
                url : Url.FIND_ACCOUNT_BY_NAME,
                data : {name:record.accountName}
            }).then(function (data1) {
                var _list = data1.result;
                if(_list.length == 0){
                    Modal.error({
                        title : "账号不存在"
                    })
                    return false;
                }
                else if(_list.length == 1){
                    var account = _list[0];
                    record.accountId = account.id;
                    record.accountName = account.name;
                    record.gameId = account.gameId;
                    record.gameId = account.gameId;
                    record.gameName = account.gameName;
                    record.platformId = account.platformId;
                    record.platformName = account.platformName;
                    record.clientBelong = account.userName;
                    record.clientBelongId = account.userId;
                    if(account.clientName == undefined || account.clientName.length == 0){
                        message.warning("账户尚未绑定客户，请手动添加",5);
                    }else{
                        record.clientName = account.clientName;
                        record.clientId = account.clientId;
                    }
                    Api.request({
                        method : "GET",
                        data : {gameId:record.gameId,platformId:record.platformId,rechargeType:record.rechargeType},
                        url : Url.QUERY_DISCOUNT,

                    }).then(function (data) {
                        if(data.status == 1){
                            validate.gameId = "";
                            validate.gameMsg = "";
                            validate.platformId = "";
                            validate.platformMsg = "";
                            var result = data.result;
                            record.point = result.point;
                            record.realPoint = result.realPoint;
                            this.setState({record:record,validate:validate});
                        }else{
                            swal({
                                title : "游戏折扣不存在",
                                text : "请检查游戏信息是否正确或添加新的折扣信息",
                                type : "error"
                            });
                            validate.gameId = "error";
                            validate.gameMsg = "折扣不存在";
                            validate.platformId = "error";
                            validate.platformMsg = "折扣不存在";
                            this.setState({
                                validate:validate,record:record
                            });
                            return false;
                        }


                    }.bind(this))
                }
            }.bind(this))
        }
    },
    _handleChange : function(e,name){
        var record = this.state.record;
        var validate = this.state.validate;
        var key = '';
        if(name){
            key = e;
            record[e] = name.target.value;
        }
        else{
            key = e.target.name;
            record[e.target.name] = e.target.value;
        }
        if(!isNaN(record.denomination)){
            if(!isNaN(record.point) && record.point >= 0 && !isNaN(record.realPoint) && record.realPoint >= 0){
                if(key != 'tradingPrice'){
                    record.tradingPrice = Math.round(record.denomination * record.point / 10);
                }
                record.productionPrice = Math.round(record.denomination * record.realPoint / 10);
                record.profit = record.tradingPrice - record.productionPrice;
                if(record.profit >= 0){
                    validate.profit = ""
                }else{
                    validate.profit = "warning"
                }
            }

        }
        if(key == 'gameId' || key == 'platformId' || key == 'rechargeType') {
            if (record.gameId && record.gameId.length > 0
                && record.platformId && record.platformId.length > 0
                && !isNaN(record.rechargeType)
            ) {

                Api.request({
                    method: "GET",
                    data: {gameId: record.gameId, platformId: record.platformId, rechargeType: record.rechargeType},
                    url: Url.QUERY_DISCOUNT,

                }).then(function (data) {
                    if (data.status == 1) {
                        validate.gameId = "";
                        validate.gameMsg = "";
                        validate.platformId = "";
                        validate.platformMsg = "";
                        var result = data.result;
                        record.point = result.point;
                        record.realPoint = result.realPoint;
                        this.setState({record: record, validate: validate});
                    } else {
                        swal({
                            title: "游戏折扣不存在",
                            text: "请检查游戏信息是否正确或添加新的折扣信息",
                            type: "error"
                        });
                        validate.gameId = "error";
                        validate.gameMsg = "折扣不存在";
                        validate.platformId = "error";
                        validate.platformMsg = "折扣不存在";
                        this.setState({
                            validate: validate
                        });
                        return false;
                    }
                }.bind(this))
            }
        }
        this.setState({record:record});
    },
    _handleSelectChange : function (name,value) {
        var record = this.state.record;
        record[name] = value;
        this.setState({record:record});
    },
    _search : function(record){
        this.findList(this.state.pageNum,this.state.pageSize,record)
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
        var obj = volidation(this.state.record);
        if(_.keys(obj).length > 0){
            this.setState({validate : obj});
            return false;
        }
        this.setState({loading:true,validate:obj});
        var record = this.state.record;
        record.updateDate = undefined;
        record.insertDate = undefined;
        Api.request({
            method : "POST",
            url : Url.SAVE_ORDER,
            data : record
        }).then(function(data){
            if(data.status == 9000){
                swal({
                    title : "不能修改其他人的订单",
                    text : "不能修改其他人的订单",
                    type : "error"
                });
                return;
            }
            this.setState({visible:false,loading:false});
            this.findList(this.state.pageNum,this.state.pageSize);
        }.bind(this))
    },
    _clear : function(){
        this.setState({searchModal:{}})
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
        if(record.gameId && record.gameId.length > 0
            && record.platformId && record.platformId.length > 0
            &&  !isNaN(record.rechargeType)
        ){
            var validate = this.state.validate;
            Api.request({
                method : "GET",
                data : {gameId:record.gameId,platformId:record.platformId,rechargeType:record.rechargeType},
                url : Url.QUERY_DISCOUNT,

            }).then(function (data) {
                var _obj = {gameId:record.gameId,platformId:record.platformId};
                if(record.rechargeType == 1){
                    _obj.clientId = record.clientId;
                }
                if(data.status == 1){
                    validate.gameId = "";
                    validate.gameMsg = "";
                    validate.platformId = "";
                    validate.platformMsg = "";
                    var result = data.result;
                    record.point = result.point;
                    record.realPoint = result.realPoint;
                    this.setState({record:record,validate:validate});
                }else{
                    swal({
                        title : "游戏折扣不存在",
                        text : "请检查游戏信息是否正确或添加新的折扣信息",
                        type : "error"
                    });
                    validate.gameId = "error";
                    validate.gameMsg = "折扣不存在";
                    validate.platformId = "error";
                    validate.platformMsg = "折扣不存在";
                    this.setState({
                        validate:validate,record:record
                    });
                    return false;
                }

                
            }.bind(this))
        }else{
            this.setState({record:record});
        }
    },
    clientHandleOk : function (client) {
        var record = this.state.record;

        if(client.name && client.name.length > 0
        &&((client.aliWang && client.aliWang.toString().length >0)
        ||(client.qq && client.qq.toString().length > 0)
        ||(client.phone && client.phone.toString().length > 0)
        ||(client.wechat && client.wechat.toString().length > 0))){
            if(client.id){
                record.clientId = client.id;
                record.clientName = client.name;
                this.setState({record:record});
            }else{
                message.warning("用户不存在将自动添加");
                Api.request({
                    url : Url.SAVE_CLIENT,
                    method : "POST",
                    data:client
                }).then(function(data){
                    client = data.result;
                    if(data.status == 2){
                        Modal.warning({
                            title : "客户已存在",
                            content : "用户重复，请继续完善信息"
                        })
                    }
                    record.clientId = client.id;
                    record.clientName = client.name;
                    if(data.status == 0){
                        Modal.warning({
                            title : "客户已存在",
                            content : "客户姓名为："+ client.name + "若有错误请联系相关人员进行修改"
                        })
                    }
                    this.setState({record:record});
                }.bind(this))
            }
        }else{
            message.error("四种联系方式至少一种不能为空")
        }

    }
});

var ButtonList = React.createClass({
    render : function(){
        return     <Row type="flex" justify="end" className="ant-btn-list">
            <Col sm={4}><Button key="showUpload" type="primary" onClick={this.props.showUpload}>上传Excel</Button></Col>
            <Col sm={4}><Button key="download" type="primary" onClick={this.props.download}>导出当前结果</Button></Col>
            <Col sm={4}><Button key="add" type="primary" onClick={this.props.add}>新增</Button></Col>
            <Col sm={4}><Button key="delete" onClick={this.props.delete}>删除</Button></Col>
        </Row>
    },
    upload : {
        
    }
})

var volidation = function (record) {
    var volidation = {};
    if(!record.clientName || record.clientName.length == 0){
        volidation.clientName = 'error';
    }

    if(isNaN(record.rechargeType)){
        volidation.rechargeType = 'error';
    }else{
        if(record.rechargeType == 0 &&( !record.accountName || record.accountName.length == 0)){
            volidation.accountName = 'error';
        }else if(record.rechargeType == 1 &&( !record.accountId || record.accountId.length == 0)){
            volidation.accountId = 'error';
        }
    }
    if(!record.gameId || record.gameId.length == 0){
        volidation.gameId = 'error';
    }
    if(!record.platformId || record.platformId.length == 0){
        volidation.platformId = 'error';
    }
    if(isNaN(record.point)){
        volidation.point = 'error';
    }
    if(isNaN(record.denomination)){
        volidation.denomination = 'error';
    }
    if(isNaN(record.tradingId)){
        volidation.tradingId = 'error';
    }
    if(isNaN(record.status)){
        volidation.status = 'error';
    }
    return volidation;
}


module.exports = Menus;