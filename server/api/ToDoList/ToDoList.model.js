'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema ({
	name: String
});

var ToDoListSchema = new Schema({
  name: String,
  active: Boolean,
  url_name: String,
  tasks: [TaskSchema]
});

module.exports = mongoose.model('ToDoList', ToDoListSchema);
