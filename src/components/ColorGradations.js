import { h } from "preact";
import { hsluvToHex } from "hsluv";
import ColorBlock from "./ColorBlock";

const ColorGradations = ({ hue, saturation }) => {
  const lightnesses = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const colorBlocks = lightnesses.map((lightness) => (
    <ColorBlock
      color={hsluvToHex([hue, saturation, lightness])}
      width={`${100 / 11}%`}
    />
  ));

  return <div>{colorBlocks}</div>;
};

export default ColorGradations;
