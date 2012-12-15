var express = require('express')
  , resource = require('express-resource')
  , app = express()
  , resources = require('./resources');

for (var name in resources) {
  app.resource(name, resources[name], {
    format: 'json'
  });
}

app.listen(8888);
