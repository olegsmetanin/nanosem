require("babel/register")({
  stage: 1
});

var Server = require('./Server.js'),
	server = new Server();

server.listen(8000);