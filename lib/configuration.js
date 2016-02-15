'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Configuration = function Configuration() {
    _classCallCheck(this, Configuration);

    //构造函数
    this.connection = null;
    this.userID = null;
    this.password = null;
    this.databaseName = null;
    this.connectionLimit = 10;
    this.timeout = 40000;
};

module.exports = new Configuration();