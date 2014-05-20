"use strict";


(function(){

  window.helper = window.helper || {};

  
  var max = 0;

  helper.parseData = function(myData, xyValues) {

    var graphNum = +xyValues[0] - 1;

    myData[graphNum] = myData[graphNum] || {
                                              key: 'firebase',
                                              color: '#ff7f0e',
                                              values: [],
                                              area: false
                                            };
                                            
    myData[graphNum].values = myData[graphNum].values || [];
    
    myData[graphNum].values.push({
      x: +xyValues[1],
      y: +xyValues[2]
    });
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