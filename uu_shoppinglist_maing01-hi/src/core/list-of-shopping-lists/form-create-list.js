//@@viewOn:imports
import { createVisualComponent, Lsi } from "uu5g05";
import importLsi from "../../lsi/import-lsi.js";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const FormCreateList = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "FormCreateList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { setModalOpenCreateList, handleListCreate } = props;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Forms.Form
        onSubmit={(e) => {
          handleListCreate(e);
          setModalOpenCreateList(false);
        }}
      >
        <Uu5Elements.Block
          footer={
            <Uu5Elements.Grid
              templateColumns={{ xs: "1fr", s: "auto" }}
              columnGap={Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"])}
              justifyContent={{ s: "end" }}
            >
              <Uu5Forms.SubmitButton colorScheme="primary" significance="distinct">
                <Lsi import={importLsi} path={["List", "createBtn"]} />
              </Uu5Forms.SubmitButton>
            </Uu5Elements.Grid>
          }
        >
          <div
            className={Config.Css.css({
              display: "grid",
              rowGap: 8,
              gridTemplateRows: "auto",
              marginBottom: 8,
            })}
          >
            <Uu5Forms.FormText name="listName" label={<Lsi import={importLsi} path={["List", "name"]} />} required />
          </div>
        </Uu5Elements.Block>
      </Uu5Forms.Form>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { FormCreateList };
export default FormCreateList;
//@@viewOff:exports
