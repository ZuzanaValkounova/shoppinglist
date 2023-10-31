//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Box, Text, Line, Button } from "uu5g05-elements";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  render() {
    //@@viewOn:private
    function handleDelete() {
      alert("I can't delete joke. I'm dumb visual component.");
    }

    function handleUpdate() {
      alert("I can't update joke. I'm dumb visual component.");
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div>
        <Uu5Elements.Grid>
          <Uu5Elements.Grid.Item>
            <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>Content A</Uu5Elements.Box>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item>
            <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>Content B</Uu5Elements.Box>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item>
            <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>Content C</Uu5Elements.Box>
          </Uu5Elements.Grid.Item>
          <Uu5Elements.Grid.Item>
            <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>Content D</Uu5Elements.Box>
          </Uu5Elements.Grid.Item>
        </Uu5Elements.Grid>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports
