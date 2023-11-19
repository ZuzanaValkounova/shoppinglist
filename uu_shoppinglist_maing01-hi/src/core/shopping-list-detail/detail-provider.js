//@@viewOn:imports
import { createComponent, useRoute, useEffect, useDataObject } from "uu5g05";
import Config from "../config/config";
import Calls from "calls";
//@@viewOff:imports

const DetailProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const [route, setRoute] = useRoute();
    const listId = route.params.id;

    const detailDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
        delete: handleDelete,
        update: handleUpdate,
      },
    });

    function handleLoad(listId) {
      const dtoIn = { id: listId };
      return Calls.Shoppinglist.get(dtoIn);
    }

    function handleCreate(values) {
      return Calls.Shoppinglist.create(values);
    }

    async function handleUpdate(list, archived) {
      const dtoIn = { id: list.id, name: list.name, archived };
      return Calls.Shoppinglist.update(dtoIn, props.baseUri);
    }

    function handleDelete(id) {
      const dtoIn = { id };
      return Calls.Shoppinglist.delete(dtoIn, props.baseUri);
    }

    useEffect(() => {
      // We don't use it to store reference on another React component
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      return;
      // We want to trigger this effect only once.
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(detailDataObject) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DetailProvider };
export default DetailProvider;
//@@viewOff:exports
