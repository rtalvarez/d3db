'use strict';

angular.module('d3dbApp', ['firebase']);

angular.module('d3dbApp')
  .controller('MainCtrl', function ($scope, $firebase) {

    var data = new Firebase("https://incandescent-fire-8620.firebaseio.com");

    $scope.data = $firebase(data);


   
  });