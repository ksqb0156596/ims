/**
 * Created by Administrator on 2016/7/20.
 */
var React = require('react');

var Table = React.createClass({
    render : function(){
        var data = this.props.data;
        var _headers = data.headers;
        var _body = data.body;
        //制作表头
        var theads = [];
        for(var i in _headers){
            theads.push(<th>{_headers[i]}</th>);
        }
        //制作表格
        var tbody = [];
        var _operation = data.operation;
        if(_operation){
            for(var i in _body){
                var trs = _body[i];
                var tds = [];
                for(var j in trs){
                    tds.push(<td>{trs[_headers[j]]}</td>);
                }
                var a = [];
                for(var k in _operation){
                    a.push(<a onClick={_operation[k].func}><i className={_operation[k].clazz}>{_operation[k].name}</i></a>);
                }
                tds.push(<td>{a}</td>);
                tbody.push(<tr>{tds}</tr>);
            }
        }else{
            for(var i in _body){
                var trs = _body[i];
                var tds = [];
                for(var j in trs){
                    tds.push(<td>{trs[_headers[j]]}</td>);
                }
            }
            tbody.push(<tr>{tds}</tr>);
        }
        return <table className="table table-striped">
            <thead>{theads}</thead>
            <tbody>{tbody}</tbody>
        </table>


    }
});

module.exports = Table;