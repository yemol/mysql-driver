require('babel/register')
var config = require ("./src/configuration.js")
var adapter = require  ("./src/mysqlAdapter.js")

config.connection = "123"
console.log (config.connection)
var connection = new adapter(config)
