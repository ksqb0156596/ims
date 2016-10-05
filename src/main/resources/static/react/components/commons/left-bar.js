/**
 * Created by Administrator on 2016/8/25.
 */

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
var Api = require('../../utils/api-utils');
var Item = Menu.Item;


function getItems(menus) {
    var _itemMenus = [];
    for(var i in menus){
        var _menu = menus[i];
        var children = []
        if(_menu.children && _menu.children.length > 0){
            var children = getItems(_menu.children);
            _itemMenus.push(<SubMenu key={_menu.resourceId} title={<span>{_menu.resourceName}</span>}>{children}</SubMenu>);
        }else{
            _itemMenus.push(<Item key={_menu.resourceId}>
                <Link to={_menu.url}>{_menu.resourceName}</Link>
            </Item>)
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
            _subMenus.push(<SubMenu key={_menu.resourceId} title={<span>{_menu.resourceName}</span>}>{children}</SubMenu>);
        }else {
            _subMenus.push(<SubMenu key={_menu.resourceId} title={<span>{_menu.resourceName}</span>}></SubMenu>);
        }
    }
    return _subMenus;
}


var LeftBar = React.createClass({
    getInitialState:function(){
         return {
             menus: [],
             current: '1',
             openKeys: []
         }
    },
    componentWillMount : function () {
        var menus = []
        if(menus.length == 0){
            Api.request({
                method : 'GET',
                url : '/ims/role/getMenus?type=1',
            }).then(function(data){
                this.setState({menus:data})
            }.bind(this))
        }
    },
    handleClick(e) {
        this.setState({
            current: e.key,
        });
    },
    onToggle(openKeys) {
        const latestOpenKey = openKeys.find(key => !(this.state.openKeys.indexOf(key) > -1));
        this.setState({ openKeys: this.getKeyPath(latestOpenKey) });
    },
    getKeyPath(key) {
        var menus = this.state.menus;
        var map = {};
        for(var i in menus){
            map[menus[i].resourceId] = [menus[i].resourceId.toString()];
        }
        return map[parseInt(key)] || [];
    },
    render : function(){
        var subMenus = [];
        var menus = this.state.menus;
        if(menus.length == 0){
            return <div></div>;
        }
        subMenus = getMenus(menus);


        return (<Menu onClick={this.handleClick}
                     style={{ width: '100%' }}
                     openKeys={this.state.openKeys}
                     onOpenChange={this.onToggle}
                     selectedKeys={[this.state.current]}
                     mode="inline">
                {subMenus}
            </Menu>)
    }
});

module.exports = LeftBar;

