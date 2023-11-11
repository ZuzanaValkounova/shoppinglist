"use strict";
const ListAbl = require("../../abl/list-abl.js");

class ListController {
  create(ucEnv) {
    return ListAbl.create(ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return ListAbl.list(ucEnv.getDtoIn());
  }
  listViewable(ucEnv) {
    return ListAbl.listViewable(ucEnv.getDtoIn());
  }
  get(ucEnv) {
    return ListAbl.get(ucEnv.getDtoIn());
  }
  delete(ucEnv) {
    return ListAbl.delete(ucEnv.getDtoIn());
  }
  deleteItem(ucEnv) {
    return ListAbl.deleteItem(ucEnv.getDtoIn());
  }
  deleteMember(ucEnv) {
    return ListAbl.deleteMember(ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return ListAbl.update(ucEnv.getDtoIn());
  }
  updateItem(ucEnv) {
    return ListAbl.updateItem(ucEnv.getDtoIn());
  }
  addMember(ucEnv) {
    return ListAbl.addMember(ucEnv.getDtoIn());
  }
  addItem(ucEnv) {
    return ListAbl.addItem(ucEnv.getDtoIn());
  }
}

module.exports = new ListController();
