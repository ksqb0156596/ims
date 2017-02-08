/**
 * Created by Administrator on 2016/9/4.
 */
var React = require('react');
var _ = require('underscore');
var swal = require('sweetalert');
import {Table} from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';
import { Modal } from 'antd';
import { message } from 'antd';
import { Popconfirm } from 'antd';
import { Form, Row, Col } from 'antd';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
var Api = require("../../utils/api-utils");
var Url = require("../../commons/api");
require("../../css/searchForm.css");



var Role = React.createClass({
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
            total:0,
            searchModal : {},
            selectedRows : [],
            isInsert : false,
            /**分配权限**/
            roleLoading : false,
            roleVisible : false,
            resources : [],
            defaultCheckedKeys : [],
            roleId : ''

        }
    },
    findList : function(current,pageSize){
        Api.request({
            method : "GET",
            url : Url.FIND_ROLE_LIST,
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
                title : "角色ID",
                key : "id",
                render : function (text) {
                    return <a href="javascript:void(0)" onClick={$this._edit.bind(null,text)}>{text.id}</a>
                },
                width:'120px'
            },
            {
                title : "角色名",
                dataIndex : "name",
                key : "name",
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
            <SearchForm search={this._search} clear={this._clear}
                        handleChange={this.searchHandleChange} searchModal={this.state.searchModal}/>
            <_Modal record={this.state.record} visible={this.state.visible} loading={this.state.loading}
                    handleChange={this._handleChange} handleOk = {this.handleOk} handleCancel={this.handleCancel}
                    resetPwd={this._resetPwd}/>
            <_RoleModal list={this.state.resources} defaultCheckedKeys={this.state.defaultCheckedKeys} visible={this.state.roleVisible} loading={this.state.roleLoading}
                        onCheck={this._handleRoleChange} handleOk = {this.handleRoleOk} handleCancel={this.handleRoleCancel}
            />
            <ButtonList add={this._add} delete={this._delete} assigned={this._assigned}/>
            <Table rowSelection={rowSelection} dataSource={this.state.menus} pagination={pagination} columns={columns} scroll={{ x:2000 }}/>
        </div>
    },
    _edit : function (record) {
        this.setState({
            record : record,
            visible : true,
            loading : false,
            isInsert : false
        })

    },
    _add : function(){
        this.setState({
            record : {},
            visible : true,
            loading : false,
            isInsert : true
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
            for(var i in selectedRows){
                // ids["ids["+i+"]"] = selectedRows[i].id;
                ids.push(selectedRows[i].id);
            }
            message.loading("加载中，请稍后。。。",0);
            Api.request({
                method : 'POST',
                url : Url.DEL_ROLE,
                data : {ids:ids}
            }).then(function(result){
                this.findList(this.state.pageNum,this.state.pageSize);
            }.bind(this))
        }.bind(this))

    },
    _handleChange : function(e){
        var record = this.state.record;
        record[e.target.id] = e.target.value;
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
        /**去掉更新时间**/
        record.updateDate = undefined;
        record.insertDate = undefined;
        Api.request({
            method : "POST",
            url : Url.SAVE_ROLE,
            data : record
        }).then(function(data){
            this.setState({visible:false,loading:false});
            this.findList(this.state.pageNum,this.state.pageSize);
        }.bind(this))
    },
    _clear : function(){
        this.setState({searchModal:{}})
    },
    _assigned : function(){
        var selectedRows = this.state.selectedRows;
        if(selectedRows.length == 0 || selectedRows.length > 1){
            message.error('请选择一条记录');
            return false;
        }
        var roleId = selectedRows[0].id;
        Api.request({
            url : Url.GET_MENUS,
            method : "GET",
            data : {type : 2}
        }).then(function (data) {
            Api.request({
                url : Url.FIND_ROLE_RESOURCE_LIST,
                method : "GET",
                data : {roleId:roleId}
            }).then(function(data1){
                this.setState({roleVisible:true,roleLoading:false,resources:data,defaultCheckedKeys:data1.result,roleId:roleId,targetKeys:data1.result})
                // this.setState({roleVisible:true,roleLoading:false,roles:_roles,targetKeys:[1]})
            }.bind(this))
        }.bind(this))

    },
    _handleRoleChange : function (targetKeys, e) {
        targetKeys = _.union(targetKeys,e.halfCheckedKeys);
        this.setState({ targetKeys:targetKeys });
    },
    handleRoleOk : function () {
        this.setState({roleLoading:true});
        var roleId = this.state.roleId;
        Api.request({
            url : Url.SAVE_ROLE_RESOURCE,
            method : "POST",
            data : {ids:this.state.targetKeys,roleId:roleId}
        }).then(function(data){
            message.info("权限分配成功");
            this.setState({roleVisible:false,roleLoading:false});
        }.bind(this))
    },
    handleRoleCancel : function () {
        this.setState({roleVisible:false,roleLoading:false});
    }
});

var ButtonList = React.createClass({
    render : function(){
        return     <Row type="flex" justify="end" className="ant-btn-list">
            <Col sm={4}><Button key="add" type="primary" onClick={this.props.add}>新增</Button></Col>
            <Col sm={4}><Button key="add" type="primary" onClick={this.props.assigned}>分配权限</Button></Col>
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
                        label="角色名"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 14 }}
                    >
                        <Input placeholder="请输入角色名称" size="default" id="search_name" value={searchModal.name} onChange={this.props.handleChange}/>
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
});

var _Modal = React.createClass({
    render : function(){
        var record = this.props.record;
        var isInsert = this.props.isInsert;
        var loginInfo = [];
        var _reset = '';
        return <Modal ref="modal"
                      visible={this.props.visible}
                      title="编辑用户" onOk={this.props.handleOk} onCancel={this.props.handleCancel}
                      footer={[<Button key="back" type="ghost" size="large" onClick={this.props.handleCancel}>返 回</Button>,
            <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.props.handleOk}>
                提 交
            </Button>]}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-4">
                        角色名
                    </div>
                    <div className="col-xs-8">
                        <Input value={record.name} id="name" onChange={this.props.handleChange}/>
                    </div>
                </div>
            </div>
        </Modal>
    },
    cancel : function () {

    }
});
function getItems(menus) {
    var _itemMenus = [];
    for(var i in menus){
        var _menu = menus[i];
        var children = []
        if(_menu.children && _menu.children.length > 0){
            var children = getItems(_menu.children);
            _itemMenus.push(<TreeNode key={_menu.resourceId} title={<span>{_menu.resourceName}</span>}>{children}</TreeNode>);
        }else{
            _itemMenus.push(<TreeNode key={_menu.resourceId} title={<span>{_menu.resourceName}</span>}>
            </TreeNode>)
        }
    }
    return _itemMenus;
}

function getMenus(menus){
    var _subMenus = [];
    for(var i in menus){
        var _menu = menus[i];
        var children = []
        if(_menu.children && _menu.children.length > 0){
            var children = getItems(_menu.children);
            _subMenus.push(<TreeNode  key={_menu.resourceId} title={<span>{_menu.resourceName}</span>}>{children}</TreeNode>);
        }else {
            _subMenus.push(<TreeNode  key={_menu.resourceId} title={<span>{_menu.resourceName}</span>}></TreeNode>);
        }
    }
    return _subMenus;
}


var _RoleModal = React.createClass({
    render : function () {
        var list = this.props.list;
        var trees = getMenus(list);
        return <Modal ref="modal"
                      visible={this.props.visible}
                      title="分配权限" onOk={this.props.handleOk} onCancel={this.props.handleCancel}
                      footer={[<Button key="back" type="ghost" size="large" onClick={this.props.handleCancel}>返 回</Button>,
            <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.props.handleOk}>
                提 交
            </Button>]}>
            <Tree className="myCls" showLine checkable
                  defaultExpandAll={true}
                  defaultCheckedKeys={this.props.defaultCheckedKeys}
                  onCheck={this.props.onCheck}
            >
                {trees}
            </Tree>
        </Modal>
    }
})

module.exports = Role;