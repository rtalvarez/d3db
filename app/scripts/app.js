'use strict';

angular.module('d3dbApp', ['firebase','ngRoute'])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/home/', {
    templateUrl: '/views/home.html',
    controller: 'MainCtrl'
  }).when('/login/', {
    templateUrl: '/views/login.html',
    controller: 'LoginCtrl'
  }).otherwise({
    redirectTo: '/login/'
  });

}])

.factory('graphFactory', function($q){

  var exports = {};

  exports.makeGraph = function(){

    var deferred = $q.defer();

    nv.addGraph(function() {
      var chart = nv.models.lineChart()
                    .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                    .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                    .transitionDuration(350)  //how fast do you want the lines to transition?
                    .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                    .showYAxis(true)        //Show the y-axis
                    .showXAxis(true);        //Show the x-axis
      

      chart.xAxis     //Chart x-axis settings
          .axisLabel('Time')
          // .tickFormat(d3.format(',r'));

      chart.yAxis     //Chart y-axis settings
          .axisLabel('Your data !')
          // .tickFormat(d3.format('.02f'));

      var myData = [];

      chart._data = myData;
      window.data = chart._data;

      d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
          .datum(myData)         //Populate the <svg> element with chart data...
          .transition().duration(500)
          .call(chart);          //Finally, render the chart!

      //Update the chart when window resizes.
      nv.utils.windowResize(function() { chart.update(); });

      deferred.resolve(chart);
      
    });

    return deferred.promise;
  };

  return exports;
})

.factory('firebaseRef', function($firebase){

  var exports = {};
  var ref = new Firebase('https://incandescent-fire-8620.firebaseio.com');
  exports.ref = ref;
  ref = $firebase(ref);
  exports.$ref = ref;
  return exports;
})

.factory('fbGraphFactory', function($firebase, graphFactory, firebaseRef){

  var exports = {};

  exports.create = function(){

    graphFactory.makeGraph().then(function(result){

      // var ref = new Firebase('https://incandescent-fire-8620.firebaseio.com');
      var ref = firebaseRef.ref;
      var chart = result;
      window.chart = chart;
      ref.on('child_added', function(snapshot){
        console.log('Child added!');
        var read = snapshot.val().split('@');
        helper.updateChart(chart._data, read, chart);
        exports.data = chart._data;
      });
      // ref = $firebase(ref);
    });
  };

  return exports;
})

.controller('MainCtrl', ['fbGraphFactory', function(fbGraphFactory){

  fbGraphFactory.create();

}])

.controller('inputCtrl', ['$scope', '$http', function($scope, $http){

  $scope.submit = function(){
    
    var values = $scope.input.split(',');
    if ($scope.input){

      $http.post('/data', { gn: values[0], ts:values[1], val:values[2] })
      .success(function(){
        console.log('Post successfull');
        $scope.input = '';
      });
    }
  };
}])

.controller('LoginCtrl', [function(){


}])





