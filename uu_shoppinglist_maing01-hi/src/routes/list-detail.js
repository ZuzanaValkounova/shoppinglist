//@@viewOn:imports
import { Utils, createVisualComponent, useRoute } from "uu5g05";
import { withRoute, RouteController } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";

import ShoppingListDetail from "../core/shopping-list-detail/shopping-list-detail";
import DetailProvider from "../core/shopping-list-detail/detail-provider.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
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
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <DetailProvider>
          {(detailDataObject) => (
            <RouteController routeDataObject={detailDataObject}>
              <div className={Config.Css.css({ padding: "16px 32px" })}>
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
