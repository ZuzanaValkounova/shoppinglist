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

const LIST1 = {
  name: "Test List",
  members: [],
  items: [],
  archived: false,
};

const LIST2 = {
  name: "Test List 2",
  members: [],
  items: [],
  archived: false,
};

const LIST3 = {
  name: "Test List 3",
  members: [],
  items: [],
  archived: false,
};

describe("uuCmd list/listViewable", () => {
  test("hds - default pageInfo", async () => {
    // create three lists as Creators
    await TestHelper.login("Creators");
    await TestHelper.executePostCommand("list/create", LIST1);
    await TestHelper.executePostCommand("list/create", LIST2);
    await TestHelper.executePostCommand("list/create", LIST3);

    const result = await TestHelper.executeGetCommand("list/listViewable");

    expect(result.data.pageInfo.total).toEqual(3);
    expect(result.data.pageInfo.pageIndex).toEqual(0);
    expect(result.data.pageInfo.pageSize).toEqual(100);
  });

  test("hds - custom pageInfo", async () => {
    await TestHelper.login("Creators");
    await TestHelper.executePostCommand("list/create", LIST1);
    await TestHelper.executePostCommand("list/create", LIST2);
    await TestHelper.executePostCommand("list/create", LIST3);

    const dtoIn = {
      pageInfo: {
        pageIndex: 1,
        pageSize: 2,
      },
    };
    const result = await TestHelper.executeGetCommand("list/listViewable", dtoIn);

    expect(result.data.pageInfo.total).toEqual(3);
    expect(result.data.pageInfo.pageIndex).toEqual(1);
    expect(result.data.pageInfo.pageSize).toEqual(2);
    expect(result.data.itemList.length).toEqual(1);
  });

  test("hds - 2 creators", async () => {
    await TestHelper.login("Creators");
    await TestHelper.executePostCommand("list/create", LIST1);

    await TestHelper.login("CreatorsDiffId");
    await TestHelper.executePostCommand("list/create", LIST2);

    const result = await TestHelper.executeGetCommand("list/listViewable");

    expect(result.data.pageInfo.total).toEqual(1);
    expect(result.data.pageInfo.pageIndex).toEqual(0);
    expect(result.data.pageInfo.pageSize).toEqual(100);
    expect(result.data.itemList.length).toEqual(1);
  });

  test("warning - unsupported keys", async () => {
    await TestHelper.login("Creators");
    await TestHelper.executePostCommand("list/create", LIST1);
    await TestHelper.executePostCommand("list/create", LIST2);

    const result = await TestHelper.executeGetCommand("list/listViewable", { another: "another" });

    expect(result.data.pageInfo.total).toEqual(2);
    expect(result.data.uuAppErrorMap).not.toBe({});
    expect(Object.keys(result.data.uuAppErrorMap).length).toEqual(1);
  });
});
