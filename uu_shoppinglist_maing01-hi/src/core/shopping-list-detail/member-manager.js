//@@viewOn:imports
import { createVisualComponent, Lsi } from "uu5g05";
import importLsi from "../../lsi/import-lsi.js";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import Member from "./member";
import Uu5Forms from "uu5g05-forms";
//@@viewOff:imports

//@@viewOn:css
//@@viewOff:css

const MemberManager = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "MemberManager",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data, handleDeleteMember, isOwner, handleAddMember, identity, ...restProps } = props;

    //@@viewOn:render
    return (
      <Uu5Elements.Modal header={<Lsi import={importLsi} path={["Detail", "members"]} />} width={600} {...restProps}>
        {data.members.map((member) => (
          <Member
            key={member.uuId}
            {...member}
            handleDeleteMember={isOwner || identity === member.uuId ? handleDeleteMember : undefined}
          />
        ))}
        {isOwner && (
          <Uu5Elements.ListItem significance="subdued" key={data.members.length}>
            <Uu5Forms.Form
              onSubmit={(e) => {
                handleAddMember(e);
              }}
            >
              <Uu5Forms.FormText name="memberUuId" label="Id" required />
              <Uu5Forms.FormText
                name="memberName"
                label={<Lsi lsi={{ cs: "Jméno", en: "Name" }} />}
                style={{ margin: "5px 0px" }}
                required
              />
              <Uu5Forms.SubmitButton colorScheme="primary" significance="distinct">
                {<Lsi import={importLsi} path={["Detail", "add"]} />}
              </Uu5Forms.SubmitButton>
            </Uu5Forms.Form>
          </Uu5Elements.ListItem>
        )}
      </Uu5Elements.Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { MemberManager };
export default MemberManager;
//@@viewOff:exports
