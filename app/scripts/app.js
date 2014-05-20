'use strict';

angular.module('d3dbApp', ['firebase'])

.controller('MainCtrl', ['$scope', '$firebase', function($scope, $firebase){

  var ref = new Firebase('https://incandescent-fire-8620.firebaseio.com');

  ref.on('child_added', function(snapshot){
    var read = snapshot.val().split('@');
    console.log(read[1]);
    helper.updateChart(myData, +read[1], chart);
  });

  ref = $firebase(ref);

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
        .axisLabel('Time')
        // .tickFormat(d3.format(',r'));

    chart.yAxis     //Chart y-axis settings
        .axisLabel('Your data !')
        // .tickFormat(d3.format('.02f'));

    var myData = [{
      key: 'Test wave',
      color: '#ff7f0e',
      values: [],
      area: false
    }];

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




