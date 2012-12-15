var Sequelize = require('sequelize');

// No password root using flowmonitor
var sequelize = new Sequelize('flowmonitor', 'root', null, {
  define: {
    underscored: true
  }
});

var Cluster = module.exports.Cluster = sequelize.define('Cluster', {
  title: Sequelize.STRING
});
var Server = module.exports.Server = sequelize.define('Server', {
  hostname: Sequelize.STRING,
  ip: Sequelize.STRING
});

Cluster.hasMany(Server);
Server.belongsTo(Cluster);