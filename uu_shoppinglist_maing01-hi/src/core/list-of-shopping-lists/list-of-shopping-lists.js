//@@viewOn:imports
import { createVisualComponent, useSession, useState, Lsi, useAppBackground } from "uu5g05";
import importLsi from "../../lsi/import-lsi";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import ShoppingListTile from "./shopping-list-tile.js";
import FormCreateList from "./form-create-list.js";
import { useAlertBus } from "uu5g05-elements";
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

const ListOfShoppingLists = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListOfShoppingLists",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const shoppinglistList = props.shoppinglistDataList.data.filter((item) => item !== undefined);
    const { addAlert } = useAlertBus();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenCreateList, setModalOpenCreateList] = useState(false);
    const [currentListId, setCurrentListId] = useState("");
    const [hideArchived, setHideArchived] = useState(true);

    const { identity } = useSession();

    async function handleListCreate(e) {
      let newList = {
        name: e.data.value.listName,
        members: [],
        items: [],
        archived: false,
      };
      let result;
      try {
        result = await props.shoppinglistDataList.handlerMap.create(newList);
      } catch (error) {
        addAlert({
          header: <Lsi import={importLsi} path={["Alert", "createFail"]} />,
          message: error.message,
          priority: "error",
        });
        return;
      }

      addAlert({
        message: <Lsi import={importLsi} path={["Alert", "createSuccess"]} params={[result.name]} />,
        priority: "success",
        durationMs: 4000,
      });

      props.shoppinglistDataList.handlerMap.load();
    }

    async function handleListDelete(id) {
      try {
        await props.shoppinglistDataList.handlerMap.delete(id);
      } catch (error) {
        addAlert({
          message: <Lsi import={importLsi} path={["Alert", "deleteFail"]} />,
          priority: "error",
          durationMs: 4000,
        });
        return;
      }
      addAlert({
        message: <Lsi import={importLsi} path={["Alert", "deleteSuccess"]} />,
        priority: "success",
        durationMs: 4000,
      });

      props.shoppinglistDataList.handlerMap.load();
    }

    async function handleListArchive(listDataObject) {
      listDataObject.data.archived = !listDataObject.data.archived;
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
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Elements.Block
        header={
          <Uu5Elements.Button
            style={{ float: "right", marginLeft: "5px" }}
            onClick={() => {
              setModalOpenCreateList(true);
            }}
          >
            <Lsi import={importLsi} path={["List", "create"]} />
          </Uu5Elements.Button>
        }
      >
        {shoppinglistList.map((list, index) =>
          !list.data.archived ? (
            <ShoppingListTile
              key={list.data.id}
              index={index}
              listDataObject={list}
              identity={identity.uuIdentity}
              setModalOpen={setModalOpen}
              setCurrentListId={setCurrentListId}
              handleListArchive={handleListArchive}
            />
          ) : null
        )}
        <Uu5Elements.Modal
          {...props}
          header={<Lsi import={importLsi} path={["List", "create"]} />}
          open={modalOpenCreateList}
          onClose={() => setModalOpenCreateList(false)}
        >
          <FormCreateList setModalOpenCreateList={setModalOpenCreateList} handleListCreate={handleListCreate} />
        </Uu5Elements.Modal>
        <Uu5Elements.Dialog
          style={{ backgroundColor: useAppBackground()[0] === "dark" ? "#404040" : null }}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          header={<Lsi import={importLsi} path={["List", "deleteTextHeader"]} />}
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info={<Lsi import={importLsi} path={["List", "deleteText"]} />}
          actionDirection="horizontal"
          actionList={[
            {
              children: <Lsi import={importLsi} path={["List", "cancelBtn"]} />,
              significance: "distinct",
            },
            {
              children: <Lsi import={importLsi} path={["List", "deleteBtn"]} />,
              onClick: () => handleListDelete(currentListId),
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
        <br />
        <Uu5Elements.Toggle
          label={<Lsi import={importLsi} path={["List", "archived"]} />}
          value={!hideArchived}
          onChange={() => {
            setHideArchived(!hideArchived);
          }}
        />
        <Uu5Elements.Line significance="subdued" />
        <Uu5Elements.CollapsibleBox collapsed={hideArchived}>
          {shoppinglistList.map((list, index) =>
            list.data.archived ? (
              <ShoppingListTile
                key={list.data.id}
                index={index}
                listDataObject={list}
                identity={identity.uuIdentity}
                setModalOpen={setModalOpen}
                setCurrentListId={setCurrentListId}
                handleListArchive={handleListArchive}
              />
            ) : null
          )}
        </Uu5Elements.CollapsibleBox>
      </Uu5Elements.Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListOfShoppingLists };
export default ListOfShoppingLists;
//@@viewOff:exports
