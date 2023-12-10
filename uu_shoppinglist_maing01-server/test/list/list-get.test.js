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

describe("uuCmd list/get", () => {
  test("hds", async () => {
    await TestHelper.login("Creators");
    const list = await TestHelper.executePostCommand("list/create", LIST);

    const result = await TestHelper.executeGetCommand("list/get", { id: list.id });

    expect(result.data.name).toEqual(LIST.name);
    expect(result.data.members).toEqual(LIST.members);
    expect(result.data.items).toEqual(LIST.items);
    expect(result.data.archived).toEqual(LIST.archived);
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("invalid dtoIn", async () => {
    await TestHelper.login("Creators");

    expect.assertions(3);
    try {
      await TestHelper.executeGetCommand("list/get", {});
    } catch (e) {
      expect(e.code).toEqual("uu-shoppinglist-main/list/get/invalidDtoIn");
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
      await TestHelper.executeGetCommand("list/get", { id: list.id });
    } catch (e) {
      expect(e.code).toEqual("uu-shoppinglist-main/list/get/notAuthorized");
      expect(e.status).toEqual(403);
    }
  });

  test("warning - unsupported keys", async () => {
    await TestHelper.login("Creators");
    const list = await TestHelper.executePostCommand("list/create", LIST);

    const result = await TestHelper.executeGetCommand("list/get", { id: list.id, another: "another" });

    expect(result.data.name).toEqual(LIST.name);
    expect(result.data.members).toEqual(LIST.members);
    expect(result.data.items).toEqual(LIST.items);
    expect(result.data.archived).toEqual(LIST.archived);
    expect(result.data.uuAppErrorMap).not.toBe({});
    expect(Object.keys(result.data.uuAppErrorMap).length).toEqual(1);
  });
});
