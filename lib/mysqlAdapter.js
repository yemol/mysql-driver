'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var mysqlAdapter = (function () {
  // constructor, used to create mysql connection pool.

  function mysqlAdapter(configuration) {
    _classCallCheck(this, mysqlAdapter);

    this.pool = _mysql2['default'].createPool({
      connectionLimit: configuration.connectionLimit,
      host: configuration.connection,
      user: configuration.userID,
      password: configuration.password
    });
    this.configuration = configuration;
  }

  // This method is used to get index id of new crated row

  _createClass(mysqlAdapter, [{
    key: 'getInsertedID',
    value: function getInsertedID(result) {
      return result === null ? -1 : result.insertId;
    }

    // This method is used to insert a new row into database
  }, {
    key: 'insert',
    value: function insert(table, fields, values) {
      var fieldStr = "";
      var valueStr = "";
      for (var i = 0; i < fields.length; i++) {
        fieldStr += "`" + fields[i] + "`,";
        valueStr += "?,";
      }
      fieldStr = fieldStr.substring(0, fieldStr.length - 1);
      valueStr = valueStr.substring(0, valueStr.length - 1);
      return this.query("INSERT INTO `" + this.configuration.databaseName + "`.`" + table + "` (" + fieldStr + ") values(" + valueStr + ")", values);
    }

    // This method is used to do a query in database
  }, {
    key: 'query',
    value: function query(command, paramters) {
      var _this = this;

      try {
        var _ret = (function () {
          var myPromise = {};
          myPromise.Promise = new Promise(function (resolve, reject) {
            myPromise.resolve = resolve;
            myPromise.reject = reject;
          });

          _this.pool.getConnection(function (err, con) {
            if (err) {
              if (con) {
                con.release();
              }
              return myPromise.reject(err);
            } else {
              // app.logger.info("MySQL command: " + command)
              con.query(command, paramters, function (err, result) {
                if (err) {
                  myPromise.reject(err);
                } else {
                  myPromise.resolve(result);
                }
              });
              if (con) {
                con.release();
              }
            }
          });
          return {
            v: myPromise.Promise
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      } catch (e) {
        return Promise.reject("Exec insert comment error in database! Error is " + e);
      }
    }
  }]);

  return mysqlAdapter;
})();

exports['default'] = mysqlAdapter;
module.exports = exports['default'];