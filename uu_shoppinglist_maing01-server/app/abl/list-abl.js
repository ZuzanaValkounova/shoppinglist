"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const ObjectId = require("mongodb").ObjectId;

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

    if (dtoIn.items.length > 0) {
      for (let i = 0; i < dtoIn.items.length; i++) {
        dtoIn.items[i].id = new ObjectId();
      }
    }

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

  async get(dtoIn, awid, session) {
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

    const uuIdentity = session.getIdentity().getUuIdentity();

    //fetch from db
    const result = await this.dao.get(awid, dtoIn.id);

    if (result.creatorUuId !== uuIdentity && !result.members.find((member) => member.uuId === uuIdentity)) {
      throw new Errors.Get.UserNotAuthorized({ uuAppErrorMap });
    }

    // prepare and return dtoOut
    const dtoOut = { ...result, uuAppErrorMap };
    return dtoOut;
  }

  async delete(dtoIn, awid, session) {
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

    const list = await this.dao.get(awid, dtoIn.id);

    const uuIdentity = session.getIdentity().getUuIdentity();

    if (list.creatorUuId !== uuIdentity) {
      throw new Errors.Delete.UserNotAuthorized({ uuAppErrorMap });
    }

    //delete from db
    const result = await this.dao.delete(awid, dtoIn.id);

    // prepare and return dtoOut
    const dtoOut = { ...result, uuAppErrorMap };
    return dtoOut;
  }

  async deleteItem(dtoIn, awid, session) {
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

    const list = await this.dao.get(awid, dtoIn.listId);

    const uuIdentity = session.getIdentity().getUuIdentity();

    if (list.creatorUuId !== uuIdentity && !list.members.find((member) => member.uuId === uuIdentity)) {
      throw new Errors.DeleteItem.UserNotAuthorized({ uuAppErrorMap });
    }

    dtoIn.itemId = new ObjectId(dtoIn.itemId);

    //delete from list in db
    const result = await this.dao.deleteItem(awid, dtoIn.listId, dtoIn.itemId);

    // prepare and return dtoOut
    const dtoOut = { ...result, uuAppErrorMap };
    return dtoOut;
  }

  async deleteMember(dtoIn, awid, session) {
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

    const list = await this.dao.get(awid, dtoIn.listId);

    const uuIdentity = session.getIdentity().getUuIdentity();

    if (
      list.creatorUuId !== uuIdentity &&
      (!list.members.find((member) => member.uuId === uuIdentity) || dtoIn.memberUuId !== uuIdentity)
    ) {
      throw new Errors.DeleteMember.UserNotAuthorized({ uuAppErrorMap });
    }

    //delete from list in db
    const result = await this.dao.deleteMember(awid, dtoIn.listId, dtoIn.memberUuId);

    // prepare and return dtoOut
    const dtoOut = { ...result, uuAppErrorMap };
    return dtoOut;
  }

  async update(dtoIn, awid, session) {
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

    const listBeforeUpdate = await this.dao.get(awid, dtoIn.id);

    const uuIdentity = session.getIdentity().getUuIdentity();

    if (listBeforeUpdate.creatorUuId !== uuIdentity) {
      throw new Errors.Update.UserNotAuthorized({ uuAppErrorMap });
    }

    let list = {};

    if (dtoIn.name) list.name = dtoIn.name;
    if ("archived" in dtoIn) list.archived = dtoIn.archived;

    //fetch from db and update
    const dtoOut = await this.dao.update(awid, dtoIn.id, list);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async updateItem(dtoIn, awid, session) {
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

    const list = await this.dao.get(awid, dtoIn.listId);

    const uuIdentity = session.getIdentity().getUuIdentity();

    if (list.creatorUuId !== uuIdentity && !list.members.find((member) => member.uuId === uuIdentity)) {
      throw new Errors.UpdateItem.UserNotAuthorized({ uuAppErrorMap });
    }

    dtoIn.itemId = new ObjectId(dtoIn.itemId);

    //update in list in db
    const dtoOut = await this.dao.updateItem(awid, dtoIn);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async addMember(dtoIn, awid, session) {
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

    const list = await this.dao.get(awid, dtoIn.listId);

    const uuIdentity = session.getIdentity().getUuIdentity();

    if (list.creatorUuId !== uuIdentity) {
      throw new Errors.AddMember.UserNotAuthorized({ uuAppErrorMap });
    }

    const member = { uuId: dtoIn.memberUuId, name: dtoIn.memberName };

    //add into list in db
    const dtoOut = await this.dao.addMember(awid, dtoIn.listId, member);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async addItem(dtoIn, awid, session) {
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

    const list = await this.dao.get(awid, dtoIn.listId);

    const uuIdentity = session.getIdentity().getUuIdentity();

    if (list.creatorUuId !== uuIdentity && !list.members.find((member) => member.uuId === uuIdentity)) {
      throw new Errors.AddItem.UserNotAuthorized({ uuAppErrorMap });
    }

    const item = { name: dtoIn.itemName, solved: dtoIn.solved, id: new ObjectId() };

    //add into list in db
    const dtoOut = await this.dao.addItem(awid, dtoIn.listId, item);

    // prepare and return dtoOut
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new ListAbl();
