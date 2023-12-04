//@@viewOn:imports
import { Utils, createVisualComponent, useRoute, useScreenSize } from "uu5g05";
import { withRoute, RouteController } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";

import ShoppingListDetail from "../core/shopping-list-detail/shopping-list-detail";
import DetailProvider from "../core/shopping-list-detail/detail-provider.js";
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

let ListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListDetail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const [route, setRoute] = useRoute();
    const [screenSize] = useScreenSize();
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar className={Css.container(screenSize)} />
        <DetailProvider>
          {(detailDataObject) => (
            <RouteController routeDataObject={detailDataObject}>
              <div className={Css.container(screenSize)}>
                <ShoppingListDetail detailDataObject={detailDataObject} />
              </div>
            </RouteController>
          )}
        </DetailProvider>
      </div>
    );
    //@@viewOff:render
  },
});

ListDetail = withRoute(ListDetail, { authenticated: true });

//@@viewOn:exports
export { ListDetail };
export default ListDetail;
//@@viewOff:exports
