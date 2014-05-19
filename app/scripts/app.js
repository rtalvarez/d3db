'use strict';

angular.module('d3dbApp', ['firebase'])

.controller('MainCtrl', ['$scope', '$firebase', function($scope, $firebase){

  var ref = new Firebase('https://incandescent-fire-8620.firebaseio.com');

  var times = [];
  var values = [];

  ref.on('child_added', function(snapshot){
    var read = snapshot.val().split('@');
    times.push(read[0].replace('~','.'));
    values.push(read[1]);
    console.log(snapshot.val());
  });

  ref = $firebase(ref);

  window.times = times;
  window.values = values;

  $scope.data = times;
  // console.log(ref);
  ref.$bind($scope, 'text');

}]);




