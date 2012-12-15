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

    model.findAll(query).success(function(records) {
      return response.json(records);
    });
  },

  // GET /:resource/:id
  show: function(request, response) {
    model.find(request.params[identifier]).success(function(record) {
      if (record === null) {
        return response.json(404, 'Not found');
      }

      return response.json(record);
    });
  }
 };
};

module.exports.clusters = Crudify(models.Cluster, 'cluster');
module.exports.servers = Crudify(models.Server, 'server');
