//@@viewOn:imports
import { Utils, createVisualComponent } from "uu5g05";
import { RouteController, withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";

import ListOfShoppingLists from "../core/list-of-shopping-lists/list-of-shopping-lists.js";
import ListProvider from "../core/list-of-shopping-lists/list-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <ListProvider>
          {(shoppinglistDataList) => (
            <RouteController routeDataObject={shoppinglistDataList}>
              <div className={Config.Css.css({ padding: "0px 32px 16px 32px " })}>
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
