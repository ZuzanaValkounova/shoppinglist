const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {
  async createSchema() {}

  async create(list) {
    return await super.insertOne(list);
  }
}

module.exports = ListMongo;
