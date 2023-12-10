const { TestHelper } = require("uu_appg01_server-test");

beforeEach(async () => {
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

  test("not authorized", async () => {
    await TestHelper.login("Creators");
    const list = await TestHelper.executePostCommand("list/create", LIST);

    await TestHelper.login("CreatorsDiffId");

    expect.assertions(2);
    try {
      await TestHelper.executePostCommand("list/update", { id: list.id, name: "Updated", archived: true });
    } catch (e) {
      expect(e.code).toEqual("uu-shoppinglist-main/list/update/notAuthorized");
      expect(e.status).toEqual(403);
    }
  });

  test("warning - unsupported keys", async () => {
    await TestHelper.login("Creators");

    const list = await TestHelper.executePostCommand("list/create", LIST);

    const result = await TestHelper.executePostCommand("list/update", {
      id: list.id,
      name: "Updated",
      another: "another",
    });

    expect(result.data.name).toEqual("Updated");
    expect(result.data.archived).toEqual(LIST.archived);
    expect(result.data.uuAppErrorMap).not.toBe({});
    expect(Object.keys(result.data.uuAppErrorMap).length).toEqual(1);
  });
});
