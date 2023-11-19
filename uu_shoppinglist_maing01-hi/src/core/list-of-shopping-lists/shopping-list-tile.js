//@@viewOn:imports
import { PropTypes, createVisualComponent, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ShoppingListTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListTile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    listDataObject: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [route, setRoute] = useRoute();
    const { identity, setModalOpen, setCurrentListId, handleListArchive } = props;
    const list = props.listDataObject.data;
    let { id } = list;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Elements.Tile>
        {list.name}
        <Uu5Elements.Button
          style={{ float: "right", marginLeft: "5px" }}
          icon="uugds-pencil"
          onClick={() => setRoute("list", { id })}
        />
        {list.creatorUuId === identity ? (
          <>
            <Uu5Elements.Button
              style={{ float: "right", marginLeft: "5px" }}
              onClick={() => {
                handleListArchive(props.listDataObject);
              }}
              icon={list.archived ? "uugds-upload" : "uugdsstencil-uiaction-archive"}
            />
            <Uu5Elements.Button
              style={{ float: "right" }}
              onClick={() => {
                setModalOpen(true);
                setCurrentListId(id);
              }}
              icon="uugds-delete"
            />
          </>
        ) : null}
      </Uu5Elements.Tile>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListTile };
export default ShoppingListTile;
//@@viewOff:exports
