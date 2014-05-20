"use strict";


(function(){

  window.helper = window.helper || {};

  var i = 0;
  var max = 0;

  helper.parseData = function(myData, yi, chartNum) {

    i++;
    myData[chartNum].values.push({
      x: i,
      y: yi
    });
[]
  };

  helper.updateChart = function(data, value, chart, chartNum){
    helper.parseData(data, value, chartNum);
    
    if (value > max) {
      // console.log('getting new max')
      helper.getNewMax(data);
      chart.yDomain([0, max]);
    }

    chart.update();
  };

  helper.getNewMax = function(data){

    var values = data[0].values;

    for (var i = 0; i < values.length; i++){

      if (values[i].y > max){
        max = values[i].y;
      }
    }
  };

  helper.hello = function(){
    alert('Hello world');
  };



})();