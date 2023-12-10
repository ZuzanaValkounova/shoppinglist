//@@viewOn:imports
import { Utils, createVisualComponent, useScreenSize } from "uu5g05";
import { RouteController, withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";

import ListOfShoppingLists from "../core/list-of-shopping-lists/list-of-shopping-lists.js";
import ListProvider from "../core/list-of-shopping-lists/list-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  container: (screenSize) => {
    let maxWidth;

    switch (screenSize) {
      case "xs":
      case "s":
        maxWidth = "100%";
        break;
      case "m":
        maxWidth = 640;
        break;
      case "l":
        maxWidth = 960;
        break;
      case "xl":
      default:
        maxWidth = 1280;
    }

    return Config.Css.css({ maxWidth: maxWidth, margin: "0px auto", paddingLeft: 16, paddingRight: 16 });
  },
  createView: () => Config.Css.css({ margin: "24px 0px" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [screenSize] = useScreenSize();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar className={Css.container(screenSize)} />
        <ListProvider>
          {(shoppinglistDataList) => (
            <RouteController routeDataObject={shoppinglistDataList}>
              <div className={Css.container(screenSize)}>
                <ListOfShoppingLists shoppinglistDataList={shoppinglistDataList} />
              </div>
            </RouteController>
          )}
        </ListProvider>
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
