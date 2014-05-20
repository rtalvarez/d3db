'use strict';

angular.module('d3dbApp', ['firebase'])

.controller('MainCtrl', ['$scope', '$firebase', function($scope, $firebase){

  var ref = new Firebase('https://incandescent-fire-8620.firebaseio.com');

  var times = [1,2,3];
  var values = [1,2,3];
  // var i = 0;

  ref.on('child_added', function(snapshot){
    var read = snapshot.val().split('@');
    times.push(read[0].replace('~','.'));
    values.push(read[1]);
    console.log(read[1]);
    helper.parseData(myData, +read[1]);
    chart.update();
    // console.log(snapshot.val());
  });

  ref = $firebase(ref);

  window.times = times;
  window.values = values;

  // $scope.data = times;
  // ref.$bind($scope, 'text');


  /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
  nv.addGraph(function() {
    var chart = nv.models.lineChart()
                  .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                  .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                  .transitionDuration(350)  //how fast do you want the lines to transition?
                  .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                  .showYAxis(true)        //Show the y-axis
                  .showXAxis(true)        //Show the x-axis
    ;

    chart.xAxis     //Chart x-axis settings
        .axisLabel('Time (ms)')
        .tickFormat(d3.format(',r'));

    chart.yAxis     //Chart y-axis settings
        .axisLabel('Voltage (v)')
        .tickFormat(d3.format('.02f'));

    /* Done setting the chart up? Time to render it!*/
    // var myData = sinAndCos();   //You need data...



    var myData = [{
      key: 'Test wave',
      color: '#ff7f0e',
      values: []
    }];

    // var arr = [];
    // myData[0].values = arr;

    // for (var i = 0; i < 100; i++){
    //   arr.push({
    //     x: i,
    //     y: i
    //   });
    // }

    console.log(myData);
    window.myData = myData;
    window.chart = chart;

    d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
        .datum(myData)         //Populate the <svg> element with chart data...
        .transition().duration(500)
        .call(chart);          //Finally, render the chart!

    //Update the chart when window resizes.
    nv.utils.windowResize(function() { chart.update(); });
    return chart;
  });



}]);




