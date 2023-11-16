"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;

const Errors = require("../api/errors/list-error.js");
const Warnings = require("../api/warnings/list-warning.js");

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("list");
  }

  async create(dtoIn, awid, session) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    const validationResult = this.validator.validate("listCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();

    dtoIn.creatorUuId = uuIdentity;
    dtoIn.creatorName = uuIdentityName;
    dtoIn.awid = awid;
    const list = await this.dao.create(dtoIn);

    // prepare and return dtoOut
    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;
  }

  async list(dtoIn, awid) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // set default value for the pageInfo
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    dtoIn.pageInfo.pageSize ??= 100;
    dtoIn.pageInfo.pageIndex ??= 0;

    // fetch categories from db
    const dtoOut = await this.dao.list(awid, dtoIn.pageInfo);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async listViewable(dtoIn, awid, session) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listListViewableDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.ListViewable.UnsupportedKeys.code,
      Errors.ListViewable.InvalidDtoIn
    );

    // set default value for the pageInfo
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    dtoIn.pageInfo.pageSize ??= 100;
    dtoIn.pageInfo.pageIndex ??= 0;

    const uuIdentity = session.getIdentity().getUuIdentity();

    const dtoOut = await this.dao.listViewable(awid, uuIdentity, dtoIn.pageInfo);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(dtoIn, awid) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //fetch from db
    const dtoOut = await this.dao.get(awid, dtoIn.id);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(dtoIn, awid) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //delete from db
    const result = await this.dao.delete(awid, dtoIn.id);

    // prepare and return dtoOut
    const dtoOut = {...result, uuAppErrorMap}
    return dtoOut;
  }

  async deleteItem(dtoIn, awid) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listDeleteItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.DeleteItem.UnsupportedKeys.code,
      Errors.DeleteItem.InvalidDtoIn
    );

    //delete from list in db
    const result = await this.dao.deleteItem(awid, dtoIn.listId, dtoIn.itemId);

    // prepare and return dtoOut
    const dtoOut = {...result, uuAppErrorMap}
    return dtoOut;
  }

  async deleteMember(dtoIn, awid) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listDeleteMemberDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.DeleteMember.UnsupportedKeys.code,
      Errors.DeleteMember.InvalidDtoIn
    );

    //delete from list in db
    const result = await this.dao.deleteMember(awid, dtoIn.listId, dtoIn.memberUuId);

    // prepare and return dtoOut
    const dtoOut = {...result, uuAppErrorMap}
    return dtoOut;
  }

  async update(dtoIn, awid) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let list = {};

    if (dtoIn.name) list.name = dtoIn.name;
    if (dtoIn.archived) list.archived = dtoIn.archived;

    //fetch from db and update
    const dtoOut = await this.dao.update(awid, dtoIn.id, list);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async updateItem(dtoIn, awid) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listUpdateItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.UpdateItem.UnsupportedKeys.code,
      Errors.UpdateItem.InvalidDtoIn
    );

    //update in list in db
    const dtoOut = await this.dao.updateItem(awid, dtoIn);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async addMember(dtoIn, awid) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listAddMemberDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.AddMember.UnsupportedKeys.code,
      Errors.AddMember.InvalidDtoIn
    );

    const member = { uuId: dtoIn.memberUuId, name: dtoIn.memberName }

    //add into list in db
    const dtoOut = await this.dao.addMember(awid, dtoIn.listId, member);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async addItem(dtoIn, awid) {
    let uuAppErrorMap = {};

    // validates dtoIn
    const validationResult = this.validator.validate("listAddItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.AddItem.UnsupportedKeys.code,
      Errors.AddItem.InvalidDtoIn
    );

    const item = {id: dtoIn.itemId, name: dtoIn.itemName, solved: dtoIn.solved }

    //add into list in db
    const dtoOut = await this.dao.addItem(awid, dtoIn.listId, item);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new ListAbl();
