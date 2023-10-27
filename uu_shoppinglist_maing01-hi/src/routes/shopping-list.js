//@@viewOn:imports
import { Utils, createVisualComponent, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 20,
      lineHeight: "1em",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <WelcomeRow left={<Uu5Elements.Icon icon="uugds-check-circle-solid" className={Css.icon()} />}>
          <Uu5Elements.Text category="story" segment="body" type="common">
            <Lsi import={importLsi} path={["ShoppingList", "somethingNew"]} />
          </Uu5Elements.Text>
        </WelcomeRow>
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
