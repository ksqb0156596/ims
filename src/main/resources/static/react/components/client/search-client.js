/**
 * Created by Administrator on 2016/9/28.
 */
var React = require('react');
import { Input } from 'antd';
import { Button } from 'antd';
import { Modal } from 'antd';
import { Select } from 'antd';
import { Form, Row, Col } from 'antd';
import { message } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
var Api = require("../../utils/api-utils");
var Url = require("../../commons/api");

var SearchClient = React.createClass({
    getInitialState : function () {
        return {
            searchFlag : 1,
            client : {},
            condition : "",
            clientList : [],
            users : [],
            oldFlag : true
        }
    },
    componentWillMount : function () {
        Api.request({
            url : Url.FIND_USER_LIST,
            data : {pageNum:1,pageSize:0}
        }).then(function(data){
            this.setState({users:data.result.list});
        }.bind(this))
    },
    componentWillReceiveProps : function (nextProps) {
        // if(nextProps.clientId && nextProps.clientId != null && nextProps.clientId.toString().length > 0){
        //     Api.request({
        //         url : Url.FIND_CLIENT_BY_ID,
        //         data : {id:nextProps.clientId}
        //     }).then(function (data) {
        //         this.setState({client:data.reuslt});
        //     })
        // }
    },
    componentWillUnmount : function () {
        this.setState({
            searchFlag : 1,
            client : {},
            condition : "",
            clientList : []
        })
    },
    render : function () {
        var searchFlag = this.state.searchFlag;
        var _form = '';
        if(searchFlag == 1){
            _form = <Form>
                <FormItem
                    label="请输入客户信息"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Input id="client-search" value={this.state.condition}onChange={this.changeCondition} />
                    <Button type="primary" icon="search" onClick={this.search}>搜 索</Button>
                </FormItem>
            </Form>
        }else if(searchFlag == 2){
            var clientOptions = [];
            var list = this.state.clientList;
            for(var i in list){
                var _temp = list[i];
                clientOptions.push(<Option key={_temp.id} value={_temp.id}>{_temp.name}</Option> );
            }
            _form = <Form>
                <FormItem
                    label="请选择客户"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Select placeholder="请选择客户" style={{ width: 120 }} onChange={this.selectChange}>
                        {clientOptions}
                    </Select>
                </FormItem>
            </Form>
        }else if(searchFlag == 3){
            var client = this.state.client;
            var flag = (client.id == undefined);
            var users = this.props.users;
            var _user = '';
            if(!flag) {
                _user = <Input id="client-username" value={client.userName} onChange={this.handleChange}/>
            }else{
                var userOptions = [];
                for(var i in users){
                    var _temp = users[i];
                    userOptions.push(<Option key={_temp.id} value={_temp.value}>{_temp.name}</Option> )
                }
                _user = <Select  placeholder="请选择归属员工" style={{ width: 120 }} onChange={this.selectUserChange}>
                    {userOptions}
                </Select>
            }
            _form = <Form horizontal>
                <FormItem
                    label="客户姓名"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    {flag?<Input id="client-name"   value={client.name}onChange={this.handleChange} />
                        :<Input id="client-name"   value={client.name}onChange={this.handleChange} readOnly={true}/>}
                </FormItem>
                <FormItem
                    label="旺旺账号"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    {flag?<Input id="client-aliWang"   value={client.aliWang}onChange={this.handleChange} />
                        :<Input id="client-aliWang"   value={client.aliWang}onChange={this.handleChange} readOnly={true}/>}
                </FormItem>
                <FormItem
                    label="qq"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    {flag?<Input id="client-qq"   value={client.qq}onChange={this.handleChange} />
                        :<Input id="client-qq"   value={client.qq}onChange={this.handleChange} readOnly={true}/>}
                </FormItem>
                <FormItem
                    label="wechat"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    {flag?<Input id="client-wechat"   value={client.wechat}onChange={this.handleChange} />
                        :<Input id="client-wechat"   value={client.wechat}onChange={this.handleChange} readOnly={true}/>}
                </FormItem>
                <FormItem
                    label="手机号"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                >
                    {flag?<Input id="client-phone"   value={client.phone}onChange={this.handleChange} />
                        :<Input id="client-phone"   value={client.phone}onChange={this.handleChange} readOnly={true}/>}
                </FormItem>

            </Form>
        }
        var submitButton = (searchFlag == 3 ? <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.props.handleOk.bind(null,this.state.client)}>
            保 存
        </Button> : '');
        return <Modal ref="modal"
                      visible={this.props.visible}
                      title="客户查询" onOk={this.props.handleOk.bind(null,this.state.client)} onCancel={this.props.handleCancel}
                      footer={[
                    <Button key="back" type="ghost" size="large" onClick={this.props.handleCancel}>返 回</Button>,
                    submitButton
                  ]}>
            {_form}
        </Modal>
    },
    changeCondition : function (e) {
        this.setState({condition:e.target.value});
    },
    search : function () {
        if(this.state.condition.length == 0){
            message.warning("请输入客户名称",5);
            return;
        }
        Api.request({
            method : "GET",
            url : Url.FIND_CLIENT_BY_CON,
            data : {condition:this.state.condition}
        }).then(function (data) {
            if(data.length == 0){
                Modal.warning({
                    title: '客户信息不存在',
                    content: '点击保存将添加新的客户',
                    onOk : function () {
                        this.setState({searchFlag : 3});
                    }.bind(this)
                });
            }else{
                this.setState({
                    searchFlag : 2,
                    clientList : data
                })
            }
        }.bind(this))
    },
    selectChange : function (value) {
        Api.request({
            url : Url.FIND_CLIENT_BY_ID,
            data : {id:value}
        }).then(function (data) {
            this.setState({searchFlag : 3,client:data.result})
        }.bind(this))
    },
    handleChange : function (e) {
        var client = this.state.client;
        var id = e.target.id.substring(7)
        client[id] = e.target.value;
        this.setState({client:client});
    },
    selectUserChange : function (value) {
        var client = this.state.client;
        client.userId = value;
        this.setState({client:client});
    }
});

module.exports = SearchClient;