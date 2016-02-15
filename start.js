require('babel/register')
var config = require ("./src/configuration.js")
var adapter = require  ("./src/mysqladapter.js")

exports.configuration = config
exports.mysqlAdapter = adapter
