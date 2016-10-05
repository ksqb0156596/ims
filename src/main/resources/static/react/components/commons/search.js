/**
 * Created by Administrator on 2016/7/17.
 */
var React = require('react');

var Search = React.createClass({
    getInitialState:function () {
        return {forms:{},hide:true}
    },
    render : function(){
        if(this.state.hide){
            return <div className="container">
                <div className="row">
                    <div className="col-xs-4 col-md-4"></div>
                    <div className="col-xs-4 col-md-4"></div>
                    <div className="col-xs-4 col-md-4"><button className="btn btn-info"  onClick={this._hide.bind(0)}>显示查询框</button></div>

                </div>
                </div>
        }
        var config = this.props.config;
        var list = config.list;
        var forms = [];
        for(var i in list){
            var _s = list[i];
            var _type = _s.type;
            switch (_type){
                case 1 : {//input text
                    forms.push(<div className="col-xs-4 col-md-4">
                        <div className="row">
                            <div className="col-xs-4 col-md-4">{_s.name}:</div>
                            <div className="col-xs-8 col-md-8">
                                <input type="text" value={this.state.forms[_s.id]} onChange={this._onChangeValue.bind(_s.id)}/></div>
                            </div>
                        </div>);
                        break;
                };
                case 2 : {//select
                    var _options = [];
                    for(var j in _s.list){
                        _options.push(<option value={_s.list[j].value}>{_s.list[j].id}</option>)
                    }
                    var _temp = <div className="col-xs-8 col-md-8">
                        <select value={this.state.forms[_s.id]} onChange={this._onChangeValue.bind(_s.id)}>
                            <option value="-1">--请选择--</option>
                            {_options}
                        </select>
                    </div>
                    forms.push(<div className="col-xs-4 col-md-4">
                            <div className="row">
                                <div className="col-xs-4 col-md-4">{_s.name}:</div>
                                <div className="col-xs-8 col-md-8">
                                    {_temp}
                                </div>
                            </div>
                    </div>);
                    break;
                }
                case 3 : {//time
                    forms.push(<div className="col-xs-4 col-md-4">
                        <div className="row">
                            <div className="col-xs-4 col-md-4">{_s.name}:</div>
                            <div className="col-xs-8 col-md-8">
                                <input type="date" value={this.state.forms[_s.id]} onChange={this._onChangeValue.bind(_s.id)}/></div>
                        </div>
                    </div>);
                    break;
                }
                case 4 : {//time to time
                    forms.push(<div className="col-xs-4 col-md-4">
                        <div className="row">
                            <div className="col-xs-4 col-md-4">{_s.name}:</div>
                            <div className="col-xs-8 col-md-8">
                                <input type="date" value={this.state.forms[_s.id]} onChange={this._onChangeValue.bind(_s.id)}/>
                                至
                                <input type="date" value={this.state.forms[_s.toId]} onChange={this._onChangeValue.bind(_s.toId)}/>
                            </div>
                        </div>
                    </div>);
                }
                default : return true;

            }
        }
        return <div className="container">
            <div className="row">{forms}</div>
            <div className="row">

                <div className="col-xs-4 col-md-4"><button className="btn btn-warning" onClick={this._reset}>重置</button></div>
                <div className="col-xs-4 col-md-4"><button className="btn btn-success">查询</button></div>
                <div className="col-xs-4 col-md-4"><button className="btn btn-info"  onClick={this._hide.bind(1)}>隐藏查询框</button></div>
            </div>
        </div>
    },
    _hide : function(status){
        if(status){
            this.setState({hide:true});
        }else{
            this.setState({hide:false})
        }
    },
    _reset:function(){
        this.setState({forms:{}});
    },
    _onChangeValue:function(id,e){
        var forms = this.state.forms;
        forms[id] = e.target.value;
        this.setState({forms:forms});
    }
});
module.exports = Search;