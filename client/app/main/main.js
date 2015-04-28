'use strict';

angular.module('toDoListApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('ToDoLists', {
        url: '/:ToDoList',
        templateUrl: 'app/main/ToDoList.html',
        controller: 'MainCtrl'
      });
  });