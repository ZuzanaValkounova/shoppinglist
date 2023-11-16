const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {
  async createSchema() {}

  async create(list) {
    return await super.insertOne(list);
  }
  async list(awid, pageInfo = {}) {
    const filter = { awid };
    return await super.find(filter, pageInfo);
  }
  async listViewable(awid, uuId, pageInfo = {}) {
    const filter = { awid, $or: [ {creatorUuId: uuId}, {"members.uuId": uuId}]};
    return await super.find(filter, pageInfo);
  }
  async get(awid, id) {
    const filter = { awid, id };
    return await super.findOne(filter);
  }
  async delete(awid, id) {
    const filter = { awid, id };
    await super.deleteOne(filter);
  }
  async deleteItem(awid, listId, itemId) {
    const filter = { awid, id: listId };
    await super.findOneAndUpdate(filter, { $pull: {items: { id: itemId } }}, true);
  }
  async deleteMember(awid, listId, memberUuId) {
    const filter = { awid, id: listId };
    await super.findOneAndUpdate(filter, { $pull: {members: { uuId: memberUuId } }}, true);
  }
  async update(awid, id, list) {
    const filter = { awid, id };
    return await super.findOneAndUpdate(filter, list, true);
  }
  async updateItem(awid, dtoIn) {
    const filter = { awid, id: dtoIn.listId, items: { $elemMatch: { id: dtoIn.itemId }}};
    return await super.findOneAndUpdate(filter, { $set: { "items.$.name": dtoIn.itemName, "items.$.solved": dtoIn.solved }}, true);
  }
  async addMember(awid, id, member) {
    const filter = { awid, id };
    return await super.findOneAndUpdate(filter, {$addToSet: {members: member}}, true);
  }
  async addItem(awid, id, item) {
    const filter = { awid, id };
    return await super.findOneAndUpdate(filter, {$addToSet: {items: item}}, true);
  }
}

module.exports = ListMongo;
