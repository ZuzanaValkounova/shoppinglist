//@@viewOn:imports
import { createVisualComponent, useState } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Config from "../../config/config.js";
//@@viewOff:imports

//@@viewOn:css
//@@viewOff:css

const TextInput = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TextInput",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { id, value, onChange, handleListRename, ...restProps } = props;
    const [v, setV] = useState(value);

    //@@viewOn:render
    return (
      <Uu5Forms.Text.Input
        value={v}
        onChange={(e) => setV(e.data.value)}
        onBlur={() => handleListRename(v)}
        significance={id ? "subdued" : undefined}
        {...restProps}
        minLength={1}
        maxLength={128}
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TextInput };
export default TextInput;
//@@viewOff:exports
