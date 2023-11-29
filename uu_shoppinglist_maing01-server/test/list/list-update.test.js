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

describe("uuCmd list/update", () => {
  test("hds", async () => {
    await TestHelper.login("Creators");

    const list = await TestHelper.executePostCommand("list/create", LIST);
    const dtoIn = {
      id: list.id,
      name: "My Test List Updated",
      archived: true,
    };
    const result = await TestHelper.executePostCommand("list/update", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.archived).toEqual(dtoIn.archived);
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("invalid dtoIn", async () => {
    await TestHelper.login("Creators");
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("list/update", {});
    } catch (e) {
      expect(e.code).toEqual("uu-shoppinglist-main/list/update/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(1);
      expect(e.status).toEqual(400);
    }
  });
});
