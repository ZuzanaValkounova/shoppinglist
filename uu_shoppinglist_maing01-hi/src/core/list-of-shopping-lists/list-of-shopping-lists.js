//@@viewOn:imports
import { createVisualComponent, useSession, useState, Utils } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import ShoppingListTile from "./shopping-list-tile.js";
import FormCreateList from "./form-create-list.js";
//@@viewOff:imports

//@@viewOn:constants
const INITIAL_DATA = [
  {
    id: Utils.String.generateId(),
    name: "Kaufland",
    members: [{ id: "m01", name: "Karel Omáčka" }],
    items: [
      { id: Utils.String.generateId(), name: "Cukr" },
      { id: Utils.String.generateId(), name: "Mouka", checked: true },
    ],
    owner: { id: "123-456", name: "Zuzana Valkounová" },
    archived: false,
  },
  {
    id: Utils.String.generateId(),
    name: "Billa",
    members: [
      { id: "m01", name: "Karel Omáčka" },
      { id: "123-456", name: "Zuzana Valkounová" },
    ],
    items: [
      { id: Utils.String.generateId(), name: "Cukr" },
      { id: Utils.String.generateId(), name: "Mouka", checked: true },
    ],
    owner: { id: "1234-5678", name: "Someone Else" },
    archived: false,
  },
  {
    id: Utils.String.generateId(),
    name: "Albert",
    members: [{ id: "m01", name: "Karel Omáčka" }],
    items: [
      { id: Utils.String.generateId(), name: "Cukr" },
      { id: Utils.String.generateId(), name: "Mouka", checked: true },
    ],
    owner: { id: "123-456", name: "Zuzana Valkounová" },
    archived: true,
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
    const [modalOpenCreateList, setModalOpenCreateList] = useState(false);
    const [currentListId, setCurrentListId] = useState("");
    const [hideArchived, setHideArchived] = useState(true);

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

    function handleListArchive(index) {
      setNewLists(([...newLists]) => {
        newLists[index].archived = !newLists[index].archived;
        return newLists;
      });
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
            Create New List
          </Uu5Elements.Button>
        }
      >
        {newLists.map((list, index) =>
          !list.archived ? (
            <ShoppingListTile
              key={list.id}
              index={index}
              {...list}
              identity={identity.uuIdentity}
              setModalOpen={setModalOpen}
              setCurrentListId={setCurrentListId}
              handleListArchive={handleListArchive}
            />
          ) : null
        )}

        <Uu5Elements.Modal
          {...props}
          header="Create New List"
          open={modalOpenCreateList}
          onClose={() => setModalOpenCreateList(false)}
        >
          <FormCreateList
            setNewLists={setNewLists}
            newLists={newLists}
            setModalOpenCreateList={setModalOpenCreateList}
            idName={identity.name}
            uuId={identity.uuIdentity}
          />
        </Uu5Elements.Modal>

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

        <br />
        <Uu5Elements.Toggle
          label="Archived"
          value={!hideArchived}
          onChange={() => {
            setHideArchived(!hideArchived);
          }}
        />
        <Uu5Elements.Line significance="subdued" />
        <Uu5Elements.CollapsibleBox collapsed={hideArchived}>
          {newLists.map((list, index) =>
            list.archived ? (
              <ShoppingListTile
                key={list.id}
                index={index}
                {...list}
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
