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
      if(err.status == 9999){
        window.location.href = '/login.html';
        return false;
      }
      swal({
        title: '系统错误，请求超时！',
        text: '',
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: '重新加载',
        closeOnConfirm: false
      },function(){
        window.location.href = '/login.html';
      });

      deferred.reject();
    });

    return deferred.promise();
  },
  download : function(obj,url){
    var form = '<form id="download" action="' + url + '">';
    var keys = _.keys(obj);
    for(var i in keys){
      var key = keys[i];
      form += "<input type='hidden' name='" + key + "' value='" + obj[key] + "' />"
    }
    form += "</form>";
    $("body").append(form);
    $("#download").submit();
    $("#download").remove();
  }
};

module.exports = APIUtils;
