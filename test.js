var configuration = require('./start.js').configuration
var mysqlAdapter = require('./start.js').mysqlAdapter

configuration.connection = "123"

console.log (configuration.connection)
var connection = new mysqlAdapter(configuration)
