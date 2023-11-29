const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
  await TestHelper.setup();
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U" });
});

afterEach(async () => {
  await TestHelper.teardown();
});

const LIST = {
  name: "My Test List",
  members: [],
  items: [],
  archived: false,
};

describe("uuCmd list/delete", () => {
  test("hds", async () => {
    await TestHelper.login("Creators");
    const list = await TestHelper.executePostCommand("list/create", LIST);

    const result = await TestHelper.executePostCommand("list/delete", { id: list.id });

    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("invalid dtoIn", async () => {
    await TestHelper.login("Creators");

    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("list/delete", {});
    } catch (e) {
      expect(e.code).toEqual("uu-shoppinglist-main/list/delete/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });
});
