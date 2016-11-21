/**
 * Created by Administrator on 2016/10/15.
 */
var React = require('react');
import { Card,Row, Col } from 'antd';

var Title = React.createClass({
    render : function () {
        var data = this.props.data;
        return <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row>
                <Col span="8">
                    <Card title="客户数量" bordered={false} style={{backgroundColor:"#87E259",marginLeft:8}} bodyStyle={{fontSize:20,fontWeight:'bold'}}>{data.clientCount}</Card>
                </Col>
                <Col span="8">
                    <Card title="账号数量" bordered={false} style={{backgroundColor:"#59E2E2",marginLeft:8}} bodyStyle={{fontSize:20,fontWeight:'bold'}}>{data.accountCount}</Card>
                </Col>
                <Col span="8">
                    <Card title="订单数量" bordered={false} style={{backgroundColor:"#EF8E8E",marginLeft:8}} bodyStyle={{fontSize:20,fontWeight:'bold'}}>{data.orderCount}</Card>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <Card title="面额" bordered={false} style={{backgroundColor:"#BFAEAE",marginLeft:8,marginTop:8}} bodyStyle={{fontSize:20,fontWeight:'bold'}}>{data.denomination}</Card>
                </Col>
                <Col span="6">
                    <Card title="成交额" bordered={false} style={{backgroundColor:"#BFAEAE",marginLeft:8,marginTop:8}} bodyStyle={{fontSize:20,fontWeight:'bold'}}>{data.trading}</Card>
                </Col>
                <Col span="6">
                    <Card title="成本" bordered={false} style={{backgroundColor:"#BFAEB3",marginLeft:8,marginTop:8}} bodyStyle={{fontSize:20,fontWeight:'bold'}}>{data.cost}</Card>
                </Col>
                <Col span="6">
                    <Card title="利润" bordered={false} style={{backgroundColor:"#AEBFB8",marginLeft:8,marginTop:8}} bodyStyle={{fontSize:20,fontWeight:'bold'}}>{data.profit}</Card>
                </Col>
            </Row>
        </div>
    }
});
module.exports = Title;