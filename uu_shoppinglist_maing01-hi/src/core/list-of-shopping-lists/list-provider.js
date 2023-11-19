//@@viewOn:imports
import { createComponent, useDataList, useEffect, useRef } from "uu5g05";
import Config from "../config/config";
import Calls from "calls";
//@@viewOff:imports

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const shoppinglistDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
        delete: handleDelete,
      },
      itemHandlerMap: {
        update: handleUpdate,
        delete: handleDelete,
      },
      pageSize: 1000,
    });

    function handleLoad(dtoIn) {
      return Calls.Shoppinglist.listViewable(dtoIn);
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
    return typeof props.children === "function" ? props.children(shoppinglistDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
