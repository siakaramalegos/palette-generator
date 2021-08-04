import { h } from "preact";
import { useState } from "preact/hooks";
import { hexToHsluv } from "hsluv";
import ColorBlock from "./ColorBlock";
import ColorGradations from "./ColorGradations";

const ColorComponent = () => {
  const [color, setColor] = useState("#e61919");

  const hsluvColor = hexToHsluv(color);
  console.log({ hsluvColor });

  return (
    <div className="color-grid">
      <label>
        CSS color value
        <input value={color} onInput={(e) => setColor(e.target.value)} />
      </label>
      <ColorBlock color={color} width={"100%"} />
      <ColorGradations hue={hsluvColor[0]} saturation={hsluvColor[1]} />
    </div>
  );
};

export default ColorComponent;
