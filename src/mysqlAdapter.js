'use strict'

import mysql from 'mysql'

// export default
module.exports = class mysqlAdapter {
  // constructor, used to create mysql connection pool.
  constructor (configuration) {
    this.pool  = mysql.createPool({
      connectionLimit: configuration.connectionLimit,
      host: configuration.connection,
      user: configuration.userID,
      password: configuration.password
    })
    this.configuration = configuration
  }

  // This method is used to get index id of new crated row
  getInsertedID (result) {
    return result === null ? -1 : result.insertId
  }

  // This method is used to insert a new row into database
  insert (table, fields, values) {
    let fieldStr = ""
    let valueStr = ""
    for (let i = 0; i < fields.length ; i++) {
      fieldStr += "`" + fields[i] + "`,"
      valueStr += "?,"
    }
    fieldStr = fieldStr.substring(0, fieldStr.length-1)
    valueStr = valueStr.substring(0, valueStr.length-1)
    return this.query ("INSERT INTO `" + this.configuration.databaseName + "`.`" + table + "` (" + fieldStr + ") values(" + valueStr + ")", values)
  }

  // This method is used to do a query in database
  query (command, paramters) {
    try {
      const myPromise = {}
      myPromise.Promise = new Promise(function (resolve, reject) {
        myPromise.resolve = resolve
        myPromise.reject = reject
      })

      this.pool.getConnection( (err, con) => {
        if (err) {
          if (con) { con.release() }
          return myPromise.reject(err)
        }
        else {
          // app.logger.info("MySQL command: " + command)
          con.query(command, paramters,
            (err, result) => {
              if (err) {
                myPromise.reject(err)
              }
              else {
                myPromise.resolve(result)
              }
            }
          )
          if (con) { con.release() }
        }
      })
      return myPromise.Promise
    }
    catch (e) {
      return Promise.reject("Exec insert comment error in database! Error is " + e)
    }
  }

}
