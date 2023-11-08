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
    const { name, identity } = props;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Elements.Tile
        onClick={() => {
          alert("I'm gonna redirect to a real list once I have a database.");
        }}
      >
        {name}
        <Uu5Elements.Button style={{ float: "right", marginLeft: "5px" }} onClick={() => {}} icon="uugds-delete" />
        <Uu5Elements.Button
          style={{ float: "right", marginLeft: "5px" }}
          onClick={() => {}}
          icon="uugdsstencil-uiaction-archive"
        />
        <Uu5Elements.Button style={{ float: "right" }} onClick={() => {}} icon="uugds-pencil" />
      </Uu5Elements.Tile>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ShoppingListTile };
export default ShoppingListTile;
//@@viewOff:exports
