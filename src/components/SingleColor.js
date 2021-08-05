import { h } from "preact";
import { hexToHsluv } from "hsluv";
import ColorBlock from "./ColorBlock";
import ColorGradations from "./ColorGradations";

// color needs to be a hex but inputted color can be any valid CSS color
const SingleColor = ({ color = "#e61919" }) => {
  const hsluvColor = hexToHsluv(color);

  return (
    <div className="color-grid">
      <ColorBlock color={color} width={"100%"} />
      <ColorGradations hue={hsluvColor[0]} saturation={hsluvColor[1]} />
    </div>
  );
};

export default SingleColor;
