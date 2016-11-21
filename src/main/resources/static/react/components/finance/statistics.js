/**
 * Created by Administrator on 2016/10/15.
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
var Title = require("./statistics/statistics-title");
var Account = require("./statistics/account");
var Client = require("./statistics/client");
var Game = require("./statistics/game");
var Platform = require("./statistics/platform");
var User = require("./statistics/user");
var UserAccount = require("./statistics/user-account");

var Statistics = React.createClass({
    componentWillMount : function () {
        this.update({});
    },
    getInitialState : function () {
        return {
            data : {
                clientCount : 0,
                accountCount : 0,
                orderCount : 0,
                trading : 0,
                cost : 0,
                profit : 0,
            },
            key : ''
        }
    },
    render : function () {
        var table = '';
        switch (this.state.key){
            case "client" : table = <Client update={this.update}/>;break;
            case "game" : table = <Game update={this.update}/>;break;
            case "platform" : table = <Platform update={this.update}/>;break;
            case "account" : table = <Account update={this.update}/>;break;
            case "user" : table = <User update={this.update}/>;break;
            case "user-account" : table = <UserAccount update={this.update}/>;break;
        }
        return <div>
            <Title data={this.state.data}/>
            <Buttons selectWay={this.selectWay}/>
            {table}
        </div>
    },
    selectWay : function (key) {
        if(key == ''){
            this.update({});
        }
        this.setState({key:key})
    },
    update : function (searchModal) {
        Api.request({
            url : Url.STATISTICS_ALL,
            data : searchModal,
        }).then(function (data) {
            this.setState({data:data})
        }.bind(this))
    }
});
module.exports = Statistics;
var Buttons = React.createClass({
    render : function () {
        return <div>
            <Row>
                <Col sm={2}/>
                <Col sm={2}>
                    <Button onClick={this.props.selectWay.bind(null,"")}>全部</Button>
                </Col>
                <Col sm={2}>
                    <Button onClick={this.props.selectWay.bind(null,"game")}>游戏</Button>
                </Col>
                <Col sm={2}>
                    <Button onClick={this.props.selectWay.bind(null,"platform")}>平台</Button>
                </Col>
                <Col sm={2}>
                    <Button onClick={this.props.selectWay.bind(null,"account")}>账号</Button>
                </Col>
                <Col sm={2}>
                    <Button onClick={this.props.selectWay.bind(null,"client")}>客户</Button>
                </Col>
                <Col sm={3}>
                    <Button onClick={this.props.selectWay.bind(null,"user")}>充值处理人</Button>
                </Col>
                <Col sm={3}>
                    <Button onClick={this.props.selectWay.bind(null,"user-account")}>账户归属人</Button>
                </Col>
            </Row>
        </div>
    }
})