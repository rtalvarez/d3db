

var handlers = {

  postData: function(request, response){

    response.set('Content-Type','application/json');
    var example = {
      key: 'Hello World!'
    };
    response.send(example);
  }
};

module.exports = function(app){

  app.post('/data', handlers.postData);

};
