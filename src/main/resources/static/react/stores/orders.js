/**
 * Created by Administrator on 2016/8/13.
 */
var _ = require('underscore');
var React = require('react');
var OKRDispatcher = require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var Store = require('../utils/store-utils');
var API = require('../apis/orders');
var ActionTypes = require('../commons/action-types');
var _orderList = [];
var OrderStore = Store.createStore({
    
    getList:function () {
        return _orderList;
    }
})

function registration(payload) {
    var action = payload.action;
    switch (action.type){
        case ActionTypes.FIND_ORDERS:_orderList = action.result;break;
    }
    OrderStore.emitChange();
}
OrderStore.dispatchToken = OKRDispatcher.register(registration);

module.exports = OrderStore;