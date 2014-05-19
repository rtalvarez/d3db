'use strict';

angular.module('d3dbApp', ['firebase'])

// angular.module('d3dbApp')
//   .controller('MainCtrl', function ($scope, $firebase) {

//     var data = new Firebase("https://incandescent-fire-8620.firebaseio.com");

//     $scope.data = $firebase(data);

   
//   });

.factory('graphData', ['$firebase', function($firebase){
  var ref = new Firebase('https://incandescent-fire-8620.firebaseio.com');
  var times = [];
  var values = [];
  ref.on('child_added', function(snapshot){
    
    var read = snapshot.val().split('@');
    times.push(read[0]);
    values.push(read[1]);

    console.log(snapshot.val());
  });  
  return $firebase(ref);
}])

// .factory('')

.controller('MainCtrl', ['$scope', 'graphData', function($scope, graphData){
  console.log(graphData);
  window.troll = graphData;
  $scope.data = graphData;

  console.log(times)

  // graphData.$bind($scope, 'text');

}]);