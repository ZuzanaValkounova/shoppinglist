//@@viewOn:imports
import { Utils, createVisualComponent, Lsi, useState, Fragment } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import Tile from "../bricks/list/tile.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
import { useSession } from "uu5g05";

//@@viewOff:imports

//@@viewOn:constants

const SHOPPING_LIST = {
  name: "Ikea",
  creator: "Zuzana Valkounová",
  members: ["Mia", "John", "Stacy"],
  createdAt: "16:00, 28. 10. 2023",
  items: [
    {
      name: "2 chairs",
      solved: false,
    },
    {
      name: "bed",
      solved: true,
    },
    {
      name: "table",
      solved: true,
    },
    {
      name: "flowers",
      solved: false,
    },
  ],
  archived: false,
};

const USERS = ["Katie", "Mia", "John", "Stacy", "Zoe", "Ben"];

//@@viewOff:constants

//@@viewOn:css
const Css = {
  gridElement: () =>
    Config.Css.css({
      padding: "0px 20px",
      border: "1px solid red",
    }),
  header: () =>
    Config.Css.css({
      fontSize: "30px",
      fontWeight: "bold",
    }),
  buttonRight: () =>
    Config.Css.css({
      marginTop: "5px",
      fontSize: "21px",
      float: "right",
    }),
  showHideButton: () =>
    Config.Css.css({
      marginTop: "5px",
      fontSize: "15px",
      float: "right",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let ShoppingList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    const userName = identity.name;

    const [listName, setListName] = useState(SHOPPING_LIST.name);
    const [editingName, setEditingName] = useState(false);
    const [showOnlyUnsolved, setShowOnlyUnsolved] = useState(false);
    const [addingItem, setAddingItem] = useState(false);
    const [newItem, setNewItem] = useState({ name: "", solved: false });

    const handleListName = (event) => {
      setListName(event.target.value);
    };

    const handleAddItem = (event) => {
      setNewItem({ name: event.target.value, solved: false });
      SHOPPING_LIST.items = { ...SHOPPING_LIST.items, newItem };
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <Uu5Elements.Grid templateColumns={"repeat(12, 1fr)"} columnGap={5}>
          {/* name of the list */}
          <Uu5Elements.Grid.Item colSpan={8} className={Css.gridElement()}>
            {editingName ? (
              <Uu5Elements.Input type="text" placeholder="Enter new name" onChange={handleListName} />
            ) : (
              <span className={Css.header()}>{SHOPPING_LIST.name}</span>
            )}
            {editingName ? (
              <Uu5Elements.Button
                significance="subdued"
                onClick={() => {
                  SHOPPING_LIST.name = listName;
                  setEditingName(false);
                }}
              >
                <Uu5Elements.Icon icon="uugds-check" colorScheme="blue" style={{ fontSize: "40px" }} />
              </Uu5Elements.Button>
            ) : SHOPPING_LIST.creator === userName ? (
              <Uu5Elements.Button significance="subdued" onClick={() => setEditingName(true)}>
                <Uu5Elements.Icon icon="uugdsstencil-edit-pencil" colorScheme="blue" style={{ fontSize: "40px" }} />
              </Uu5Elements.Button>
            ) : null}
            {/* archive and delete buttons */}
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item colSpan={4} className={Css.gridElement()}>
            <Uu5Elements.Button
              className={Css.buttonRight()}
              significance="subdued"
              icon="uugds-delete"
              colorScheme="red"
            />
            <Uu5Elements.Button
              className={Css.buttonRight()}
              significance="subdued"
              icon="uugdsstencil-uiaction-archive"
              colorScheme="orange"
            />
          </Uu5Elements.Grid.Item>
          {/* some info about the list */}
          <Uu5Elements.Grid.Item colSpan={7} className={Css.gridElement()}>
            <p>
              Created by {SHOPPING_LIST.creator} at {SHOPPING_LIST.createdAt}
            </p>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item colSpan={1}>
            <Uu5Elements.Button
              className={Css.showHideButton()}
              significance="common"
              colorScheme="blue"
              onClick={() => setShowOnlyUnsolved(!showOnlyUnsolved)}
            >
              {showOnlyUnsolved ? "Show All" : "Hide Bought"}
            </Uu5Elements.Button>
          </Uu5Elements.Grid.Item>
          {/* the list items */}
          <Uu5Elements.Grid.Item colSpan={8} rowSpan={50} className={Css.gridElement()}>
            {SHOPPING_LIST.items.map((item, index) => {
              if (showOnlyUnsolved && item.solved) {
                return null;
              } else {
                return <p>{item.name}</p>;
              }
            })}
            <Uu5Elements.Button icon="uugds-plus" colorScheme="blue" onClick={() => setAddingItem(true)} />
          </Uu5Elements.Grid.Item>
          {/* the list members */}
          <Uu5Elements.Grid.Item colSpan={4} rowSpan={20} className={Css.gridElement()}></Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
      </div>
    );
    //@@viewOff:render
  },
});

ShoppingList = withRoute(ShoppingList, { authenticated: true });

//@@viewOn:exports
export { ShoppingList };
export default ShoppingList;
//@@viewOff:exports
