var models = require('./models');

var Crudify = function(model, identifier) {
 return {
  // GET /:resource
  index: function(request, response) {
    var query = {
      where: {}
    };
    for (var key in request.query) {
      if (typeof model.rawAttributes[key] === 'undefined') {
        continue;
      }

      query.where[key] = request.query[key];
    }

    model.findAll(query).success(function(results) {
      var data = {
        status: 'success',
        results: results
      };
      response.send(JSON.stringify(data));
    });
  },

  // GET /:resource/:id
  show: function(request, response) {
    model.find(request.params[identifier]).success(function(result) {
      var data = {
        status: 'success',
        result: result
      };
      response.send(JSON.stringify(data));
    });
  }
 };
};

module.exports.clusters = Crudify(models.Cluster, 'cluster');
module.exports.servers = Crudify(models.Server, 'server');
