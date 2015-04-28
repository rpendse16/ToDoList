/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var ToDoList = require('../api/ToDoList/ToDoList.model');


ToDoList.find({}).remove(function() {
  ToDoList.create({});
});