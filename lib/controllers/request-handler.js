
var Firebase = require('firebase');
var firebase = new Firebase('https://incandescent-fire-8620.firebaseio.com');

var sendResponse = function(req, res, code){
  res.send(code);
};


var handlers = {

  postData: function(req, res){

    // Ex of data format:
    // {
    //   ts: "Date ISOString here",
    //   val: "Paired value",
    //   force: "false o true"
    // }

    var writeCallback = function(error){
      if (error){
        console.log('Error saving data: ' + error);
        sendResponse(req, res, 504);
      } else {
        console.log('Data saved');
        sendResponse(req, res, 202);
      }
    };

    res.set('Content-Type','application/json');

    var ts = req.body.ts;
    var val = req.body.val;
    var graphNum = req.body.gn;
    

    var data = graphNum + '@' + ts + '@' + val;

    firebase.push(data, writeCallback);

    // Leave this for later
    // if (force) {
    //   firebase.push({
    //     ts: val
    //   }, writeCallback);
    // } else {
    //   firebase.update({
    //     ts: val
    //   }, writeCallback);
    // }
    //res.send();
  }
};

module.exports = function(app){

  app.post('/data', handlers.postData);

};

