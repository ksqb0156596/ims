/**
 * Created by Administrator on 2016/7/20.
 */
var React = require('react');

var Forms = React.createClass({
    getInitialState : function(){
        return {
            forms : {}
        }

    },
    render : function(){
        var forms = this.props.forms;
        var formsDom = [];
        for(var i in forms){
            var _form = forms[i];
            switch (_form.type){
                case 1 : {//input
                    formsDom.push(<div className="row">
                        <div className="col-xs-4 col-md-4">{_form.name}</div>
                        <div className="col-xs-8 col-md-8">
                            {_form.disable ?<input type="text" value={this.state.forms[_form.id]}/>:
                                <input type="text" value={this.state.forms[_form.id]} onChange={this._onChangeValue.bind(_form.id)}/>
                            }

                        </div>
                    </div>);
                    break;
                }
                case 2 : {//select
                    var _list = _form.list;
                    var options = [];
                    for(var i in _list){
                        var _option = _list[i];
                        options.push(<option value={_option.id}>{_option.value}</option>)
                    }
                    formsDom.push(<div className="row">
                        <div className="col-xs-4 col-md-4">{_form.name}</div>
                        <div className="col-xs-8 col-md-8">
                            <select>
                                <option value="-1">--请选择--</option>
                                {options}
                            </select>
                        </div>
                    </div>);
                    break;
                }
                case 3 : {//date
                    formsDom.push(<div className="row">
                        <div className="col-xs-4 col-md-4">{_form.name}</div>
                        <div className="col-xs-8 col-md-8">
                            {_form.disable ?<input type="text" value={this.state.forms[_form.id]}/>:
                                <input type="date" value={this.state.forms[_form.id]} onChange={this._onChangeValue.bind(_form.id)}/>
                            }

                        </div>
                    </div>);
                    break;
                }
                case 4 : {//textarea
                    formsDom.push(<div className="row">
                        <div className="col-xs-4 col-md-4">{_form.name}</div>
                        <div className="col-xs-8 col-md-8">
                            <textarea type="date" value={this.state.forms[_form.id]} onChange={this._onChangeValue.bind(_form.id)}/>
                        </div>
                    </div>);
                }
            }
        }
        return <div className="container">
                    {formsDom}
                <div className="row">
                    <div className="col-xs-4 col-md-4"><button className="btn btn-warning">取消</button></div>
                    <div className="col-xs-4 col-md-4"><button className="btn btn-success">提交</button></div>
                </div>
        </div>
    },
    _onChangeValue : function (id,e) {
        var _forms = this.state.forms;
        _forms[id] = e.target.value;
        this.setState({forms:_forms});
    }
});

module.exports = Forms;