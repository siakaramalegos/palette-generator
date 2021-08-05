import { h } from "preact";
import ColorBlock from "./ColorBlock";
import ColorGradations from "./ColorGradations";

// color needs to be a hex but inputted color can be any valid CSS color
const SingleColor = ({ color, scales }) => (
  <div className="color-grid">
    <ColorBlock color={color} width={"100%"} />
    <ColorGradations scales={scales} />
  </div>
);

export default SingleColor;
