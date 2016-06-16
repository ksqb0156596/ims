/**
 * Created by Administrator on 2016/4/20.
 */
var React = require('react');

var App = React.createClass({
    render : function(){
        return <div className='app'>{this.props.children || <p>Please log in!!</p>}</div>
    }
});
module.exports = App;