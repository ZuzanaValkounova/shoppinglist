//@@viewOn:imports
import { createComponent, useRoute, useDataObject } from "uu5g05";
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
      initialDtoIn: listId,
      handlerMap: {
        load: handleLoad,
        deleteItem: handleDeleteItem,
        deleteMember: handleDeleteMember,
        update: handleUpdate,
        updateItem: handleUpdateItem,
        addItem: handleAddItem,
        addMember: handleAddMember,
      },
    });

    function handleLoad(listId) {
      const dtoIn = { id: listId };
      return Calls.Shoppinglist.get(dtoIn);
    }

    function handleDeleteItem(listId, itemId) {
      const dtoIn = { listId, itemId };
      return Calls.Shoppinglist.deleteItem(dtoIn, props.baseUri);
    }

    function handleDeleteMember(listId, memberUuId) {
      const dtoIn = { listId, memberUuId };
      return Calls.Shoppinglist.deleteMember(dtoIn, props.baseUri);
    }

    function handleUpdate(list) {
      const dtoIn = { id: list.id, name: list.name };
      return Calls.Shoppinglist.update(dtoIn, props.baseUri);
    }

    function handleUpdateItem(listId, itemId, itemName, solved) {
      const dtoIn = { listId, itemId, itemName, solved };
      return Calls.Shoppinglist.updateItem(dtoIn, props.baseUri);
    }

    function handleAddItem(listId, itemName) {
      const dtoIn = { listId, itemName, solved: false };
      return Calls.Shoppinglist.addItem(dtoIn, props.baseUri);
    }

    function handleAddMember(listId, memberUuId, memberName) {
      const dtoIn = { listId, memberUuId, memberName };
      return Calls.Shoppinglist.addMember(dtoIn, props.baseUri);
    }
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
