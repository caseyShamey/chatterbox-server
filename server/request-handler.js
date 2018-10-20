var utils = require('./utils');

var objectId = 1;
var messages = [
  {
    username: 'Jono',
    text: 'Do my bidding!',
    objectId: objectId
  }];

var actions = {
  'GET': function(request, response) {
    utils.respond(response, {results: messages});
  },
  'POST': function(request, response) {
    utils.collectData(request, function(message) {
      messages.push(message);
      message.objectId = objectId++;
      utils.respond(response, {objectId: 1}, 201);
    });
  },
  'OPTIONS': function(request, response) {
    utils.respond(response, null);
  }
};

var requestHandler = function(request, response) {

  var action = actions[request.method];
  if (action) {
    action(request, response);
  } else {
    utils.respond(response, 'Nope, not found', 404);
  }

  // var path = url.parse(request.url).pathname;
  // console.log('path', path);
  // console.log(request);



  // if (request.method === 'GET') { //&& path === '/classes/messages') {
  //   // var data = {};
  //   // data.results = messages;
  //   // data = JSON.stringify(data);
  //   // console.log('data', data);
  // }

  // // if (request.method === 'GET' && path !== '/classes/messages') {
  // //   response.writeHead(404, 'Nope!', headers);
  // //   respond(response, 'Nope!', 404);
  // // }

  // if (request.method === 'POST') { //&& path === '/classes/messages') {
  //   // var body = '';
  //   // request.on('error', (err) => {
  //   //   console.error(err);
  //   // }).on('data', (chunk) => {
  //   //   body += chunk;
  //   // }).on('end', () => {
  //   //   var data = JSON.parse(body);
  //   //   messages.push(data);
  //   // });
  // }

  // if (request.method === 'OPTIONS') {
  // }
};

exports.requestHandler = requestHandler;
