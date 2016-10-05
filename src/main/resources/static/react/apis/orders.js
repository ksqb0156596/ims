/**
 * Created by Administrator on 2016/8/13.
 */
var _ = require('underscore');
var APIUtils = require('../utils/api-utils');
var Api = require('../commons/api');
var OrderApi = _.extend({}, APIUtils, {
    findList : function(data){
        return this.request({
            method : 'GET',
            url : Api.FIND_ORDERS,
            data : data
        })
    }
});
module.exports = OrderApi;