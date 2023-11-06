"use strict";
const ListAbl = require("../../abl/list-abl.js");

class ListController {
  create(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ListAbl.create(awid, dtoIn);
  }
}

module.exports = new ListController();
