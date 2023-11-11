//@@viewOn:imports
import { createVisualComponent, useSession, useState, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import ShoppingListTile from "./shopping-list-tile.js";
//@@viewOff:imports

//@@viewOn:constants
const INITIAL_DATA = [
  {
    id: Utils.String.generateId(),
    name: "Kaufland",
    memberList: [{ id: "m01", name: "Karel Omáčka" }],
    itemList: [
      { id: Utils.String.generateId(), name: "Cukr" },
      { id: Utils.String.generateId(), name: "Mouka", checked: true },
    ],
    owner: { id: "9633-8599-9311-0000", name: "Zuzana Valkounová" },
  },
  {
    id: Utils.String.generateId(),
    name: "Billa",
    memberList: [
      { id: "m01", name: "Karel Omáčka" },
      { id: "9633-8599-9311-0000", name: "Zuzana Valkounová" },
    ],
    itemList: [
      { id: Utils.String.generateId(), name: "Cukr" },
      { id: Utils.String.generateId(), name: "Mouka", checked: true },
    ],
    owner: { id: "1234-5678", name: "Someone Else" },
  },
];
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
  defaultProps: {
    data: INITIAL_DATA,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data } = props;
    const [newLists, setNewLists] = useState([...data]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentListId, setCurrentListId] = useState("");

    const { identity } = useSession();

    function handleListDelete(id) {
      id
        ? setNewLists(
            newLists.filter((obj) => {
              return obj.id !== id;
            })
          )
        : null;
      setCurrentListId("");
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Elements.Block
        header={
          <>
            <Uu5Elements.Button style={{ float: "right", marginLeft: "5px" }} onClick={() => {}}>
              Create New List
            </Uu5Elements.Button>
            <Uu5Elements.Button style={{ float: "right" }} onClick={() => {}}>
              View Archived
            </Uu5Elements.Button>
          </>
        }
      >
        {newLists.map((list, index) => (
          <ShoppingListTile
            key={list.id}
            {...list}
            identity={identity.uuIdentity}
            handleListDelete={handleListDelete}
            setModalOpen={setModalOpen}
            setCurrentListId={setCurrentListId}
          />
        ))}

        <Uu5Elements.Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          header="Confirm deletion?"
          icon={<Uu5Elements.Svg code="uugdssvg-svg-delete" />}
          info="This step cannot be undone."
          actionDirection="horizontal"
          actionList={[
            {
              children: "Cancel",
              significance: "distinct",
            },
            {
              children: "Delete",
              onClick: () => handleListDelete(currentListId),
              colorScheme: "red",
              significance: "highlighted",
            },
          ]}
        />
      </Uu5Elements.Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListOfShoppingLists };
export default ListOfShoppingLists;
//@@viewOff:exports
