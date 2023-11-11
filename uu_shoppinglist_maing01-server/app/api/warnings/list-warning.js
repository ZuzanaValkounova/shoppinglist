const Errors = require("../errors/list-error.js");

const Warnings = {
  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },
  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },
  ListViewable: {
    UnsupportedKeys: {
      code: `${Errors.ListViewable.UC_CODE}unsupportedKeys`,
    },
  },
  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },
  },
  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  },
  DeleteItem: {
    UnsupportedKeys: {
      code: `${Errors.DeleteItem.UC_CODE}unsupportedKeys`,
    },
  },
  DeleteMember: {
    UnsupportedKeys: {
      code: `${Errors.DeleteMember.UC_CODE}unsupportedKeys`,
    },
  },
  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
  },
  UpdateItem: {
    UnsupportedKeys: {
      code: `${Errors.UpdateItem.UC_CODE}unsupportedKeys`,
    },
  },
  AddMember: {
    UnsupportedKeys: {
      code: `${Errors.AddMember.UC_CODE}unsupportedKeys`,
    },
  },
  AddItem: {
    UnsupportedKeys: {
      code: `${Errors.AddItem.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;
