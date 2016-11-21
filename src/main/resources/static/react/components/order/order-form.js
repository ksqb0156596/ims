/**
 * Created by Administrator on 2016/9/25.
 */
import { Input } from 'antd';
import { DatePicker  } from 'antd';
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
const createForm = Form.create;
var React = require('react');
var $ = require('jquery');
var Api = require("../../utils/api-utils");
var Url = require("../../commons/api");
var Client = require("../client/search-client");

var Forms = React.createClass({
    getInitialState : function () {
        return {
            visible : false,
            loading : false,
            client : {},
            oldFlag : true,
            record : {},
            tradingList : []
        }
    },
    componentDidMount : function () {
        $("input").attr("autocomplete","off");
    },
    componentDidUpdate : function () {
        $("input").attr("autocomplete","off");
    },
    componentWillReceiveProps : function (nextProps) {
         this.setState({visible : false,
             loading : false});
    },
    render : function(){
        var users = this.props.users;
        var validateStatus = this.props.validate;
        var tradingOption = [];
        var tradingList = this.props.tradingList;
        for(var i in tradingList){
            tradingOption.push(<Option key={tradingList[i].id} value={tradingList[i].id}>{tradingList[i].name}</Option>)
        }
        var userOptions = [];
        for(var i in users){
            userOptions.push(<Option key={users[i].id} value={users[i].id}>{users[i].name}</Option>)
        }
        var platformOptions = [];
        var platformList = this.props.platformList;
        for(var i in platformList){
            platformOptions.push(<Option key={"p" + platformList[i].id} name={platformList[i].id} value={platformList[i].name}>{platformList[i].name}</Option>);
        }
        var gameOptions = [];
        var gameList = this.props.gameList;
        for(var i in gameList){
            gameOptions.push(<Option key={"g" + gameList[i].id} name={gameList[i].id} value={gameList[i].name}>{gameList[i].name}</Option>);
        }

        var record = this.props.record;
        var _Client = '';
        if(this.state.visible){
            _Client = <Client visible={this.state.visible} loading={this.state.loading} clientId={record.clientId} users={users}
                               handleCancel = {this.handleCancel} handleOk={this.props.clientHandleOk}
            />;
        }
        var account = [];
        account.push(
            <FormItem
                id="accountName"
                label="账号"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                key="accountName"
                validateStatus={validateStatus.accountName ? validateStatus.accountName : validateStatus.accountId}
            >
                <Input value={record.accountName} name="accountName" onChange={this.props.handleChange} onBlur={this.props.handleBlur}/>
            </FormItem>
        );
        if(record.rechargeType == 0){
            account.push(
                <FormItem
                    id="accountPwd"
                    label="初始密码"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    key="1"
                >
                    <Input value={record.accountPwd} name="accountPwd" onChange={this.props.handleChange}/>
                </FormItem>
            )
        }


        return <div>{_Client}
            <Modal ref="modal"
                      visible={this.props.visible}
                      title="编辑订单" onOk={this.props.handleOk} onCancel={this.props.handleCancel}
                      footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.props.handleCancel}>返 回</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.props.handleOk}>
                      提 交
                    </Button>
                  ]}>

            <Form horizontal>
                <FormItem
                    id="orderNo"
                    label="订单号"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}

                >
                    <Input value={record.orderNo} name="orderNo" disabled={true}/>
                </FormItem>
                <FormItem
                    id="orderDate"
                    label="订单日期"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}

                >
                    <Input type="date" value={record.orderDate} name="orderDate"  onChange={this.props.handleChange}/>
                </FormItem>
                <FormItem
                    id="rechargeType"
                    label="充值类型"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    validateStatus={validateStatus.rechargeType}
                >
                    <RadioGroup onChange={this.props.handleChange.bind(null,"rechargeType")} name="rechargeType" value={record.rechargeType}>
                        <RadioButton value={0}>首充</RadioButton>
                        <RadioButton value={1}>续充</RadioButton>
                    </RadioGroup>
                </FormItem>
                {account}
                <FormItem
                    id="gameName"
                    label="游戏名"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    validateStatus={validateStatus.gameId}
                    help={validateStatus.gameMsg}
                >
                    <input style={{display:'none'}} />
                    {
                        record.rechargeType == 1?<Input value={record.gameName}  disabled /> : <Select
                            combobox
                            value={record.gameName}
                            placeholder="请输入游戏名称"
                            notFoundContent="没有匹配项"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onChange={this.props.handleGameChange.bind(null,"game")}
                            onSelect={this.props.handleGameSelectChange.bind(null,"game")}
                            style={{width:'100%'}}
                        >
                            {gameOptions}
                        </Select>
                    }

                </FormItem>
                <FormItem
                    id="platformName"
                    label="平台"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    validateStatus={validateStatus.platformId}
                    help={validateStatus.platformMsg}
                >
                    <input style={{display:'none'}} />
                    {
                        record.rechargeType == 1?<Input value={record.platformName} disabled /> : <Select
                            combobox
                            value={record.platformName}
                            placeholder="请输入平台名称"
                            notFoundContent="没有匹配项"
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onChange={this.props.handleGameChange.bind(null,"platform")}
                            onSelect={this.props.handleGameSelectChange.bind(null,"platform")}
                            style={{width:'100%'}}
                        >
                            {platformOptions}
                        </Select>
                    }

                </FormItem>
                <FormItem
                    id="clientName"
                    label="客户名称"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    validateStatus={validateStatus.clientName}
                >
                    <Input value={record.clientName} name="clientName" readOnly={true} onClick={this.findClients}/>
                </FormItem>
                <FormItem
                    id="point"
                    label="折扣"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    validateStatus={validateStatus.point}
                >
                    <Input type="number" step="0.1" value={record.point} name="point" onChange={this.props.handleChange}/>
                </FormItem>
                <FormItem
                    id="realPoint"
                    label="成本折扣"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Input type="number" value={record.realPoint} name="realPoint" disabled={true}/>
                </FormItem>
                <FormItem
                    id="denomination"
                    label="面额"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    validateStatus={validateStatus.denomination}
                >
                    <Input type="number" value={record.denomination} name="denomination" onChange={this.props.handleChange} />
                </FormItem>
                <FormItem
                    id="tradingPrice"
                    label="交易价格"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Input type="number" value={record.tradingPrice} name="tradingPrice" onChange={this.props.handleChange}/>
                </FormItem>
                <FormItem
                    id="productionPrice"
                    label="成本价"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Input type="number" value={record.productionPrice} name="productionPrice" disabled={true}/>
                </FormItem>
                <FormItem
                    id="profit"
                    label="利润"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Input type="number" value={record.profit} name="profit" disabled={true}/>
                </FormItem>
                <FormItem
                    id="tradingName"
                    label="付款方式"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    validateStatus={validateStatus.tradingId}
                >
                    <Select value={record.tradingId ? record.tradingId.toString():''}  onChange={this.props.handleSelectChange.bind(null,"tradingId")} name="tradingId">
                        {tradingOption}
                    </Select>
                </FormItem>
                <FormItem
                    id="directorName"
                    label="充值处理人"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    validateStatus={validateStatus.directorId}
                >
                    <Select value={record.directorId ? record.directorId.toString():''}  onChange={this.props.handleSelectChange.bind(null,"directorId")} name="directorId">
                        {userOptions}
                    </Select>
                </FormItem>
                <FormItem
                    id="clientBelong"
                    label="账户归属人"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    {record.rechargeType == 1?<Input value={record.clientBelong} name="clientBelong"  disabled={true}/>:
                    <Select value={record.clientBelongId ? record.clientBelongId.toString():''}  onChange={this.props.handleSelectChange.bind(null,"clientBelongId")} name="clientBelongId">
                        {userOptions}
                    </Select>}
                </FormItem>
                <FormItem
                    id="status"
                    label="订单状态"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    validateStatus={validateStatus.status}
                >
                    <Select value={record.status ? record.status.toString():'' }  onChange={this.props.handleSelectChange.bind(null,"status")} name="status">
                        {this.props.statusOptions}
                    </Select>
                </FormItem>
            </Form>>
        </Modal>
        </div>
    },
    findClients : function () {
        var client = this.state.client;
        if(client.id && client.id.length > 0){}
        else {client = {}};
        this.setState({
            client : client,
            visible : true,
            loading : false
        })
    },
    handleCancel : function () {
        this.setState({visible:false,loading:false});
    },
    _handleChange : function (e) {
        var client = this.state.client;
        var id = e.target.id;
        id = id.substring(7);
        var value = e.target.value;
        client[id] = value;
        this.setState({
            client:client
        })
    },
});
module.exports = Forms;