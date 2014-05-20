"use strict";


(function(){

  window.helper = window.helper || {};

  helper.parseData = function(datum, xi, yi) {

    datum.push({
      x: xi,
      y: yi
    });

  };

  helper.hello = function(){
    alert('Hello world');
  };
})();