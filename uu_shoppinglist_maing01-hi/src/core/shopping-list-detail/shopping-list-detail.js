//@@viewOn:imports
import { createVisualComponent, useRoute, useSession, useState, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import ItemList from "./item-list";
import TextInput from "./text-input";
import MemberManager from "./member-manager";
import { useAlertBus } from "uu5g05-elements";
import Item from "./item.js";
//@@viewOff:imports

//@@viewOn:constants
const INITIAL_DATA = {
  id: "cd8f0b48",
  name: "Kaufland",
  memberList: [{ id: "m01", name: "Karel Omáčka" }],
  itemList: [
    { id: Utils.String.generateId(), name: "Cukr" },
    { id: Utils.String.generateId(), name: "Mouka", checked: true },
  ],
  owner: { id: "9633-8599-9311-0000", name: "Zuzana Valkounová" },
};

// TODO work 1h 45min
//@@viewOff:constants

//@@viewOn:css
const Css = {
  panel: () =>
    Config.Css.css({
      marginTop: 32,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const listDataObject = props.detailDataObject;
    const { addAlert } = useAlertBus();

    const [route, setRoute] = useRoute();
    const [name, setName] = useState(listDataObject.data.name);
    const [memberList, setMemberList] = useState(listDataObject.data.members);
    // const [itemList, setItemList] = useState(listDataObject.data.items);

    const [modalOpen, setModalOpen] = useState(false);

    const listId = route.params.id;
    const { identity } = useSession();
    const isOwner = identity?.uuIdentity === listDataObject.data.creatorUuId;

    // const uncheckedItemList = [];
    // const checkedItemList = [];
    // itemList.forEach((item) => {
    //   item.solved ? checkedItemList.push(item) : uncheckedItemList.push(item);
    // });
    // uncheckedItemList.push({});

    const [checkedOpen, setCheckedOpen] = useState(false);

    async function handleCheckItem(item) {
      // if (id) {
      //   setItemList(([...currItemList]) => {
      //     const index = currItemList.findIndex((item) => item.id === id);
      //     const item = currItemList[index];
      //     currItemList.splice(index, 1, { ...item, solved: !item.solved });
      //     return currItemList;
      //   });
      // }
      try {
        await props.detailDataObject.handlerMap.updateItem(listDataObject.data);
      } catch (error) {}
    }

    function handleChangeName(id, name) {
      // setItemList(([...currItemList]) => {
      //   if (id) {
      //     const index = currItemList.findIndex((item) => item.id === id);
      //     const item = currItemList[index];
      //     currItemList.splice(index, 1, { ...item, name });
      //   } else {
      //     if (name) currItemList.push({ id: Utils.String.generateId(), name });
      //   }
      //   return currItemList;
      // });
    }

    async function handleDelete(itemId) {
      // setItemList(([...currItemList]) => {
      //   const index = currItemList.findIndex((item) => item.id === itemId);
      //   currItemList.splice(index, 1);
      //   return currItemList;
      // });
      try {
        await props.detailDataObject.handlerMap.deleteItem(listId, itemId);
      } catch (error) {
        addAlert({
          message: `List delete failed!`,
          priority: "error",
          durationMs: 4000,
        });
        return;
      }
      // props.detailDataObject.handlerMap.load(listId);
    }

    async function handleListRename(value) {
      listDataObject.data.name = value;
      try {
        await listDataObject.handlerMap.update(listDataObject.data);
      } catch (error) {
        addAlert({
          message: `List update failed.`,
          priority: "error",
          durationMs: 4000,
        });
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Elements.Block
        header={
          <Uu5Elements.Text category="interface" segment="title" type="common">
            {isOwner
              ? ({ style }) => (
                  <TextInput
                    className={Config.Css.css(style)}
                    id={"header"}
                    value={name}
                    onChange={setName}
                    handleListRename={handleListRename}
                  />
                )
              : name}
          </Uu5Elements.Text>
        }
        actionList={[
          {
            icon: "uugdsstencil-user-account-key",
            children: listDataObject.data.creatorName,
            onClick: () => setModalOpen(true),
          },
        ]}
        headerSeparator={true}
      >
        <div>{JSON.stringify(listDataObject)}</div>
        {/* <ItemList
          data={listDataObject.data.items}
          onCheck={handleCheckItem}
          onNameChange={handleChangeName}
          onDelete={handleDelete}
          listCheched={false}
        /> */}
        <div style={{ display: "inline-block", width: 320 }}>
          {listDataObject.data.items.map((item, i) =>
            !item.solved ? (
              <Item
                key={item.id || i}
                {...item}
                onCheck={() => handleCheckItem(item.id)}
                onNameChange={(newName) => onNameChange(item.id, newName)}
                onDelete={() => handleDelete(item.id)}
              />
            ) : null
          )}
        </div>

        <Uu5Elements.LinkPanel
          header="Show checked"
          open={checkedOpen}
          onChange={() => setCheckedOpen(!checkedOpen)}
          className={Css.panel()}
        >
          <div style={{ display: "inline-block", width: 320 }}>
            {listDataObject.data.items.map((item, i) =>
              item.solved ? (
                <Item
                  key={item.id || i}
                  {...item}
                  onCheck={() => handleCheckItem(item.id)}
                  onNameChange={(newName) => onNameChange(item.id, newName)}
                  onDelete={() => handleDelete(item.id)}
                />
              ) : null
            )}
          </div>
          {/* <ItemList
            data={listDataObject.data.items}
            onCheck={handleCheckItem}
            onNameChange={handleChangeName}
            onDelete={handleDelete}
            listCheched={true}
          /> */}
        </Uu5Elements.LinkPanel>

        <MemberManager
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={memberList}
          onChange={setMemberList}
          isOwner={isOwner}
        />
      </Uu5Elements.Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
