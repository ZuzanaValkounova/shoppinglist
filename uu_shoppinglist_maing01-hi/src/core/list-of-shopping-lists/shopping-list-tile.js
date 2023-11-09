//@@viewOn:imports
import { createVisualComponent, Tile, useSession } from "uu5g05";
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
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { id, owner, name, identity, setModalOpen, setCurrentListId } = props;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Elements.Tile>
        {name}
        <Uu5Elements.Button
          style={{ float: "right", marginLeft: "5px" }}
          icon="uugds-pencil"
          onClick={() => alert(id)}
        />
        {identity === owner.id ? (
          <>
            <Uu5Elements.Button
              style={{ float: "right", marginLeft: "5px" }}
              onClick={() => {}}
              icon="uugdsstencil-uiaction-archive"
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
