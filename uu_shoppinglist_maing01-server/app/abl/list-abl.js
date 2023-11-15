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

  async create(dtoIn) {
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

    dtoIn.awid = awid;
    const list = await this.dao.create(dtoIn);

    // prepare and return dtoOut
    const dtoOut = { ...list, uuAppErrorMap };
    return dtoOut;
  }

  async list(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  async listViewable(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  async get(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  async delete(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  async deleteItem(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  async deleteMember(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  async update(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  async updateItem(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  async addMember(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }

  async addItem(dtoIn) {
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

    // prepare and return dtoOut
    const dtoOut = { ...dtoIn, uuAppErrorMap };
    return dtoOut;
  }
}

module.exports = new ListAbl();
