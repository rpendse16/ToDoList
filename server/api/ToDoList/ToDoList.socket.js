/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ToDoList = require('./ToDoList.model');

exports.register = function(socket) {
  ToDoList.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ToDoList.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ToDoList:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ToDoList:remove', doc);
}