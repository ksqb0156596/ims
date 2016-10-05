/**
 * Created by Administrator on 2016/4/20.
 */
var React = require('react');
var LeftBar = require('./commons/left-bar');
var TopBar = require('./commons/top-bar');
require('../css/app.css');

var App = React.createClass({
    render : function(){
        return (<div className="app">
            <div className="app-head"><TopBar /></div>
            <div className="app-left"><LeftBar /></div>
            <div className='app-body'>{this.props.children || <p>Please log in!!</p>}</div>
        </div>);
    }
});
module.exports = App;