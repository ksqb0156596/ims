var _ = require('underscore');
var $ = require('jquery');
var swal = require('sweetalert');
require('sweetalert/dist/sweetalert.css');
var APIUtils = {
  request: function(req) {
    var deferred = $.Deferred();

    var request = $.ajax({
      dataType: 'json',
      method: req.method,
      url: req.url,
      //data: JSON.stringify(req.data)
      data: req.data
    });

    request.done(function(data) {
      if(typeof(data) != 'object' )data = JSON.parse(data);
      deferred.resolve(data);
    });

    request.fail(function(err) {
      swal({
        title: '系统错误，请求超时！',
        text: '',
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: '重新加载',
        closeOnConfirm: false
      },function(){
        window.location.href = '/';
      });

      deferred.reject();
    });

    return deferred.promise();
  }
};

module.exports = APIUtils;
