require('babel-register')
var config = require ("./src/configuration.js")
var adapter = require  ("./src/mysqlAdapter.js")

config.connection = "123"
// var connection = new adapter(config)
var connection = new adapter(config)
console.log (connection)
