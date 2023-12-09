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

describe("uuCmd list/create", () => {
  test("hds", async () => {
    await TestHelper.login("Creators");

    const dtoIn = {
      name: "My Test List",
      members: [],
      items: [{ name: "banana", solved: false }],
      archived: false,
    };
    const result = await TestHelper.executePostCommand("list/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.members).toEqual(dtoIn.members);
    expect(result.data.items.length).toEqual(1);
    expect(result.data.archived).toEqual(dtoIn.archived);
    expect(result.data.creatorUuId).toBeDefined();
    expect(result.data.creatorName).toBeDefined();
    expect(result.data.awid).toEqual(TestHelper.awid);
    expect(result.data.uuAppErrorMap).toEqual({});
  });

  test("invalid dtoIn", async () => {
    await TestHelper.login("Creators");
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("list/create", {});
    } catch (e) {
      expect(e.code).toEqual("uu-shoppinglist-main/list/create/invalidDtoIn");
      expect(Object.keys(e.paramMap.missingKeyMap).length).toEqual(4);
      expect(e.status).toEqual(400);
    }
  });

  test("warning - unsupported keys", async () => {
    await TestHelper.login("Creators");

    const dtoIn = {
      name: "My Test List",
      members: [],
      items: [],
      archived: false,
      another: "another",
    };
    const result = await TestHelper.executePostCommand("list/create", dtoIn);

    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.members).toEqual(dtoIn.members);
    expect(result.data.items).toEqual(dtoIn.items);
    expect(result.data.archived).toEqual(dtoIn.archived);
    expect(result.data.creatorUuId).toBeDefined();
    expect(result.data.creatorName).toBeDefined();
    expect(result.data.awid).toEqual(TestHelper.awid);
    expect(result.data.uuAppErrorMap).not.toBe({});
    expect(Object.keys(result.data.uuAppErrorMap).length).toEqual(1);
  });
});
