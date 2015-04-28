'use strict';

angular.module('toDoListApp')
  .controller('MainCtrl', function ($scope, $http, socket, $stateParams) {
    $scope.ToDoLists = [];
    $scope.Tasks = [];
    $http.get('/api/ToDoLists').success(function(awesomeToDoLists) {
      $scope.awesomeToDoLists = awesomeToDoLists;
      socket.syncUpdates('ToDoList', $scope.awesomeToDoLists);
      awesomeToDoLists.forEach(function(ToDoList) {
        if(ToDoList.name == $stateParams.ToDoList) {
          $scope.ToDoList = ToDoList;
        }
      });
      console.log(awesomeToDoLists);
    });

    $scope.addToDoList = function() {
      if($scope.newToDoList === '') {
        return;
      }
      $http.post('/api/ToDoLists', { name: $scope.newToDoList });
      $scope.newToDoList = '';
    };

    $scope.deleteToDoList = function(ToDoList) {
      $http.delete('/api/ToDoLists/' + ToDoList._id);
    };

    $scope.addToTasks = function() {
      if($scope.newTask === '') {
        return;
      }
      $scope.awesomeToDoLists.forEach(function(ToDoList) {
        if(ToDoList._id == $stateParams.ToDoList) {
          $scope.ToDoList = ToDoList;
        }
      });
      var currentToDo = $stateParams.ToDoList;
      $scope.ToDoList.tasks.push({name: $scope.newTask});
      $http.put('/api/ToDoLists/' + currentToDo, { tasks: $scope.ToDoList.tasks});
      $scope.newTask = '';
    };

    $scope.deleteTask = function(Task) {
      $scope.awesomeToDoLists.forEach(function(ToDoList) {
        if(ToDoList._id == $stateParams.ToDoList) {
          $scope.ToDoList = ToDoList;
        }
      });
      var currentToDo = $stateParams.ToDoList;
      $http.delete('/api/ToDoLists/' + currentToDo + tasks[]);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('ToDoList');
    });
  });
