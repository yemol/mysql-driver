require('babel/register')

module.exports = {
    configuration: require("./lib/configuration.js"),
    mysqlAdapter: require("./lib/mysqladapter.js"),
};

// var config = require ("./lib/configuration.js")
// var adapter = require  ("./lib/mysqladapter.js")
// exports.configuration = config
// exports.mysqlAdapter = adapter
