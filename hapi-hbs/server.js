var Hapi            = require('hapi');
var config          = require('getconfig');

var moonbootsConfig = require('./moonbootsConfig');
var fakeApi         = require('./fakeApi');

var server          = new Hapi.Server();
var internals       = {};

internals.configStateConfig = {
  encoding: 'none',
  ttl: 1000 * 60 * 15,
  isSecure: config.isSecure
};

server.connection({ host: config.http.listen, port: config.http.port });
server.state('config', internals.configStateConfig);
internals.clientConfig = JSON.stringify(config.client);

server.ext('onPreResponse', function(request, reply) {
  if (!request.state.config) {
    var response = request.response;
    return reply(response.state('config', encodeURIComponent(internals.clientConfig)));
  }
  else {
    return reply.continue();
  }
});

server.register({ register: require('moonboots_hapi').register, options: moonbootsConfig }, function (err) {
    if (err) throw err;
    server.register(fakeApi, function (err) {
        if (err) throw err;
        // If everything loaded correctly, start the server:
        server.start(function (err) {
            if (err) throw err;
            console.log('Hapi Handlebars Example. is running at: http://localhost:' + config.http.port);
        });
    });
});
