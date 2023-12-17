//@@viewOn:imports
import { Lsi, createVisualComponent, useRoute, useSession, useState } from "uu5g05";
import importLsi from "../../lsi/import-lsi.js";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import TextInput from "./text-input";
import MemberManager from "./member-manager";
import { useAlertBus } from "uu5g05-elements";
import Item from "./item.js";
import { PieChart } from "uu5chartsg01";
//@@viewOff:imports

//@@viewOn:constants
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
    const [modalOpen, setModalOpen] = useState(false);
    const [modalChartOpen, setModalChartOpen] = useState(false);
    const [newItem, setNewItem] = useState("");
    const [checkedOpen, setCheckedOpen] = useState(false);

    const listId = route.params.id;
    const { identity } = useSession();
    const isOwner = identity?.uuIdentity === listDataObject.data.creatorUuId;
    const chartData = [
      { solved: <Lsi lsi={{ cs: "Vyřešeno", en: "Solved" }} />, sum: 0 },
      { solved: <Lsi lsi={{ cs: "Nevyřešeno", en: "Unsolved" }} />, sum: 0 },
    ];

    {
      listDataObject.data.items.map((item) => {
        item.solved ? (chartData[0].sum += 1) : (chartData[1].sum += 1);
      });
    }

    async function handleUpdateItem(itemName, itemId, itemSolved) {
      try {
        await props.detailDataObject.handlerMap.updateItem(listId, itemId, itemName, itemSolved);
      } catch (error) {
        addAlert({
          message: <Lsi import={importLsi} path={["Alert", "itemUpFail"]} />,
          priority: "error",
          durationMs: 4000,
        });
      }
    }

    async function handleAddItem() {
      try {
        await props.detailDataObject.handlerMap.addItem(listId, newItem);
        setNewItem("");
      } catch (error) {
        addAlert({
          message: <Lsi import={importLsi} path={["Alert", "itemAddFail"]} />,
          priority: "error",
          durationMs: 4000,
        });
        return;
      }
    }

    async function handleDelete(itemId) {
      try {
        await props.detailDataObject.handlerMap.deleteItem(listId, itemId);
      } catch (error) {
        addAlert({
          message: <Lsi import={importLsi} path={["Alert", "itemDelFail"]} />,
          priority: "error",
          durationMs: 4000,
        });
        return;
      }
    }

    async function handleListRename(value) {
      listDataObject.data.name = value;
      try {
        await listDataObject.handlerMap.update(listDataObject.data);
      } catch (error) {
        addAlert({
          message: <Lsi import={importLsi} path={["Alert", "updateFail"]} />,
          priority: "error",
          durationMs: 4000,
        });
      }
    }

    async function handleAddMember(e) {
      try {
        await props.detailDataObject.handlerMap.addMember(listId, e.data.value.memberUuId, e.data.value.memberName);
      } catch (error) {
        addAlert({
          message: <Lsi import={importLsi} path={["Alert", "memberAddFail"]} />,
          priority: "error",
          durationMs: 4000,
        });
        return;
      }
    }

    async function handleDeleteMember(memberUuId) {
      try {
        await props.detailDataObject.handlerMap.deleteMember(listId, memberUuId);
      } catch (error) {
        addAlert({
          message: <Lsi import={importLsi} path={["Alert", "memberRemFail"]} />,
          priority: "error",
          durationMs: 4000,
        });
        return;
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
                    handleRename={handleListRename}
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
          { icon: "uugdsstencil-chart-pie-chart", onClick: () => setModalChartOpen(true) },
        ]}
        headerSeparator={true}
      >
        <div style={{ display: "inline-block", width: 320 }}>
          {listDataObject.data.items.map((item, i) =>
            !item.solved ? (
              <Item
                key={item.id || i}
                {...item}
                onCheck={handleUpdateItem}
                onNameChange={(newName) => onNameChange(item.id, newName)}
                handleChangeName={handleUpdateItem}
                onDelete={handleDelete}
              />
            ) : null
          )}
        </div>

        <br />
        <br />
        <Uu5Elements.Input
          style={{ marginLeft: 16 }}
          value={newItem}
          onChange={(e) => setNewItem(e.data.value)}
          onBlur={newItem ? () => handleAddItem() : undefined}
        />

        <Uu5Elements.LinkPanel
          header={<Lsi import={importLsi} path={["Detail", "checked"]} />}
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
                  onCheck={handleUpdateItem}
                  onNameChange={(newName) => onNameChange(item.id, newName)}
                  onDelete={handleDelete}
                />
              ) : null
            )}
          </div>
        </Uu5Elements.LinkPanel>

        <MemberManager
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          data={listDataObject.data}
          handleDeleteMember={handleDeleteMember}
          isOwner={isOwner}
          handleAddMember={handleAddMember}
          identity={identity.uuIdentity}
        />

        <Uu5Elements.Modal
          open={modalChartOpen}
          onClose={() => setModalChartOpen(false)}
          header={<Lsi import={importLsi} path={["Detail", "chart"]} />}
        >
          <PieChart
            data={chartData}
            serieList={[
              {
                valueKey: "sum",
                labelKey: "solved",
                label: true,
              },
            ]}
          />
        </Uu5Elements.Modal>
      </Uu5Elements.Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
