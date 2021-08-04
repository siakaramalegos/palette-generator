import { h } from "preact";
import { useState } from "preact/hooks";
import { hexToHsluv } from "hsluv";
import ColorBlock from "./ColorBlock";
import ColorGradations from "./ColorGradations";
import tinycolor from "tinycolor2";

// defaultColor needs to be a hex but inputted color can be any valid CSS color
const ColorComponent = ({ defaultColor = "#e61919" }) => {
  const [color, setColor] = useState(defaultColor);
  const changeColor = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const inputtedColor = form.get("color");

    const hex = tinycolor(inputtedColor).toHex();
    setColor(`#${hex}`);
  };

  const hsluvColor = hexToHsluv(color);

  return (
    <div className="color-grid">
      <form onSubmit={changeColor}>
        <label>
          CSS color value
          <input name="color" value={color} />
        </label>
        <button>Generate scale</button>
      </form>
      <ColorBlock color={color} width={"100%"} />
      <ColorGradations hue={hsluvColor[0]} saturation={hsluvColor[1]} />
    </div>
  );
};

export default ColorComponent;
