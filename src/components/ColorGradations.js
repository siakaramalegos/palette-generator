import { hsluvToHex } from "hsluv";
import { h } from "preact";
import ColorBlock from "./ColorBlock";

const ColorGradations = ({ scales }) => {
  const colorBlocks = scales.map((color) => (
    <ColorBlock color={color} width={`${100 / 11}%`} />
  ));

  return <div>{colorBlocks}</div>;
};

export default ColorGradations;
