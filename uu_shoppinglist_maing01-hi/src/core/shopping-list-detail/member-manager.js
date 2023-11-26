//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
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
      <Uu5Elements.Modal header="Members" width={600} {...restProps}>
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
              <Uu5Forms.FormText name="memberUuId" placeholder="id" required />
              <Uu5Forms.FormText name="memberName" placeholder="name" style={{ margin: "5px 0px" }} required />
              <Uu5Forms.SubmitButton>Add</Uu5Forms.SubmitButton>
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
