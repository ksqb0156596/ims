var React = require('react');
var Dispatcher = require('flux').Dispatcher;

var OKRDispatcher = new Dispatcher();

OKRDispatcher.handleViewAction = function(action) {
  console.log('View Action: ', action);
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

OKRDispatcher.handleServerAction = function(action) {
  console.log('Server Action: ', action);
  this.dispatch({
    source: 'SERVER_ACTION',
    action: action
  });
}

module.exports = OKRDispatcher;

