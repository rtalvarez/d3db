"use strict";


(function(){

  window.helper = window.helper || {};

  var i = 0;

  helper.parseData = function(myData, xi, yi) {

    i++;
    myData[0].values.push({
      x: i,
      y: yi
    });
[]
  };

  helper.hello = function(){
    alert('Hello world');
  };
})();