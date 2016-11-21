/**
 * Created by Administrator on 2016/5/9.
 */
var React = require('react');
var ReactDom = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;
var IndexRedirect = require('react-router').IndexRedirect;
var App = require('./components/app');
var Order = require('./components/order/order');
var Menus = require("./components/user/menus");
var User = require("./components/user/user");
var Role = require('./components/user/role');
var Client = require('./components/client/client');
var Game = require('./components/game/game');
var Platform = require('./components/game/platform');
var Trading = require('./components/finance/trading');
var Discount = require('./components/finance/discount');
var Account = require('./components/client/account');
var Statistics = require('./components/finance/statistics');
ReactDom.render(
    <Router history={browserHistory}>
        <Route  path="/" component={App} >
            <IndexRedirect to="order" />
            <Route path="order" component={Order}></Route>
            <Route path="menus" component={Menus}></Route>
            <Route path="user" component={User}></Route>
            <Route path="role" component={Role}></Route>
            <Route path="client" component={Client}></Route>
            <Route path="game" component={Game}></Route>
            <Route path="platform" component={Platform}></Route>
            <Route path="trading" component={Trading}></Route>
            <Route path="discount" component={Discount}></Route>
            <Route path="account" component={Account}></Route>
            <Route path="statistics" component={Statistics}></Route>
        </Route>
    </Router>,document.getElementById('wrapper'));