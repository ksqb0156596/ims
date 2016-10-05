/**
 * Created by Administrator on 2016/8/13.
 */
var _ = require('underscore');
var Dispatcher = require('../dispatcher/dispatcher');
var ActionType = require('../commons/action-types');
var Store = require('../stores/orders');
var API = require('../apis/orders');
var Action = {
    findList : function (order) {
        API.findList(order).then(function(data){
            Dispatcher.handleViewAction({
                type:ActionType.FIND_ORDERS,
                result:data.result
            })
        })
    }
}


module.exports = Action;