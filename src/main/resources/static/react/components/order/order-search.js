/**
 * Created by Administrator on 2016/9/25.
 */
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
var React = require('react');
var SearchForm = React.createClass({
    getInitialState : function () {
        return {
            record : {}
        }
    },
    render : function(){
        var users = this.props.users;
        var record = this.state.record;
        var userOptions = [];
        for(var i in users){
            userOptions.push(<Option key={users[i].id} value={users[i].id}>{users[i].name}</Option>)
        }
        return  <Form horizontal  className="ant-advanced-search-form">
            <Row type="flex">
                <Col sm={8}>
                    <FormItem
                        label="订单号"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入订单号" size="default" id="search_orderNo" value={record.orderNo} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="游戏名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入游戏名" size="default" id="search_gameName" value={record.gameName} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="平台名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入平台名" size="default" id="search_platformName" value={record.platformName} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="客户名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入游戏名" size="default" id="search_clientName" value={record.clientName} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="账户"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入账户" size="default" id="search_accountName" value={record.accountName} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="账号类型"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select value={record.rechargeType} placeholder="请选择交易方式" allowClear={true}
                                onChange={this.handleSelectChange.bind(null,"rechargeType")} name="rechargeType">
                            {userOptions}
                        </Select>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="折扣"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input type="number" placeholder="请输入折扣" size="default" id="search_point" value={record.point} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="成本折扣"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input type="number" placeholder="请输入成本折扣" size="default" id="search_realPoint" value={record.realPoint} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="充值面额"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input type="number" placeholder="请输入充值面额" size="default" id="search_denomination" value={record.denomination} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="付款金额"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input type="number"  placeholder="请输入付款金额" size="default" id="search_tradingPrice" value={record.tradingPrice} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="成本"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入成本" size="default" id="search_productionPrice" value={record.productionPrice} onChange={this.handleChange}/>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="订单状态"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select value={record.status} placeholder="请选择订单状态" allowClear={true}
                                onChange={this.handleSelectChange.bind(null,"status")} name="status">
                            {this.props.statusOptions}
                        </Select>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="充值处理人"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select value={record.directorId} placeholder="请选择充值处理人" allowClear={true}
                                onChange={this.handleSelectChange.bind(null,"directorId")} name="directorId">
                            {userOptions}
                        </Select>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="客户归属人"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select value={record.clientBelongId} placeholder="请选择客户归属人" allowClear={true}
                                onChange={this.handleSelectChange.bind(null,"clientBelongId")} name="clientBelongId">
                            {userOptions}
                        </Select>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="订单创建人"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select value={record.createUser} placeholder="请选择订单创建人" allowClear={true}
                                onChange={this.handleSelectChange.bind(null,"insertUser")} name="insertUser">
                            {userOptions}
                        </Select>
                    </FormItem>
                </Col>
                <Col sm={8}>
                    <FormItem
                        label="订单更新人"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Select value={record.updateUser} placeholder="请选择订单更新人" allowClear={true}
                                onChange={this.handleSelectChange.bind(null,"updateUser")} name="updateUser">
                            {userOptions}
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={12} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" onClick={this.props.search.bind(null,this.state.record)}>搜索</Button>
                    <Button onClick={this.clear}>清除条件</Button>
                </Col>
            </Row>
        </Form>
    },
    handleChange : function (e) {
        var record = this.state.record;
        var id = e.target.id;
        id = id.substring(7);
        record[id] = e.target.value;
        this.setState({record:record});
    },
    handleSelectChange : function (name,value) {
        var record = this.state.record;
        record[name] = value;
        this.setState({record:record});
    },
    clear : function () {
        this.setState({record:{}})
    }
});

module.exports = SearchForm;