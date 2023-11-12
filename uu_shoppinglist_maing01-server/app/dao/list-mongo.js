const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {
  async createSchema() {}

  async create(list) {
    return await super.insertOne(list);
  }
  async listByVisibility(awid, visibility, pageInfo = {}) {
    const filter = { awid, visibility };
    return await super.find(filter, pageInfo);
  }
  async get(awid, dtoIn) {
    const filter = { awid, dtoIn };
    return await super.findOne(filter);
  }
  async update(awid, id, list) {
    const filter = { awid, id };
    return await super.findOneAndUpdate(id, list);
  }
  async delete(awid, id) {
    const filter = { awid, id };
    await super.deleteOne(filter);
  }
}

module.exports = ListMongo;
