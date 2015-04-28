
'use strict';

var _ = require('lodash');
var ToDoList = require('./ToDoList.model');

// Get list of ToDoLists
exports.index = function(req, res) {
  ToDoList.find(function (err, ToDoLists) {
    if(err) { return handleError(res, err); }
    return res.json(200, ToDoLists);
  });
};

// Get a single list
exports.show = function(req, res) {
  ToDoList.findById(req.params.id, function (err, ToDoList) {
    if(err) { return handleError(res, err); }
    if(!ToDoList) { return res.send(404); }
    return res.json(ToDoList);
  });
};

// Creates a new ToDoList in the DB.
exports.create = function(req, res) {
  ToDoList.create(req.body, function(err, ToDoList) {
    if(err) { return handleError(res, err); }
    return res.json(201, ToDoList);
  });
};

// Updates an existing ToDoList in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ToDoList.findById(req.params.id, function (err, ToDoList) {
    if (err) { return handleError(res, err); }
    if(!ToDoList) { return res.send(404); }
    var updated = _.merge(ToDoList, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, ToDoList);
    });
  });
};

// Deletes a ToDoList from the DB.
exports.destroy = function(req, res) {
  ToDoList.findById(req.params.id, function (err, ToDoList) {
    if(err) { return handleError(res, err); }
    if(!ToDoList) { return res.send(404); }
    ToDoList.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}