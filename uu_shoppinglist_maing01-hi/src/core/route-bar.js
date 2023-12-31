//@@viewOn:imports
import { createVisualComponent, useRoute, useAppBackground } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5App from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [, setRoute] = useRoute();
    const [background, setBackground] = useAppBackground();
    const darkMode = background === "dark";

    const actionList = [
      {
        children: (
          <Uu5Elements.Toggle
            value={!darkMode}
            onChange={() =>
              setBackground({
                backgroundColor: darkMode
                  ? null
                  : Uu5Elements.UuGds.ColorPalette.getValue(["building", "dark", "main"]),
              })
            }
            iconOff="uugdsstencil-weather-moon"
            iconOn="uugdsstencil-weather-sun"
          />
        ),
      },
      {
        children: <Uu5Elements.Icon icon="uugds-home" style={{ fontSize: "25px" }} />,
        onClick: () => setRoute("home"),
      },
    ];
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <Plus4U5App.PositionBar actionList={actionList} view="short" {...props} />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
