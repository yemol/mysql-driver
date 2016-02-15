'use strict'

class Configuration {
  constructor() { //构造函数
      this.connection = null;
      this.userID = null;
      this.password = null;
      this.databaseName = null;
      this.connectionLimit = 10;
      this.timeout = 40000;
  }
}



module.exports = new Configuration()
