import { h } from "preact";
import { useState } from "preact/hooks";
import { hexToHsluv, hsluvToHex } from "hsluv";
import SingleColor from "./SingleColor";
import chroma from "chroma-js";

const LIGHTNESSES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const INITIAL_COLORS = ["#ff0000", "blue"];
const INITIAL_STATE = INITIAL_COLORS.map((color) => getColorObject(color));

function getColorObject(color) {
  const hex = chroma(color).hex();
  const hsluvColor = hexToHsluv(hex);

  return {
    color,
    hsluvColor,
    scales: LIGHTNESSES.map((lightness) =>
      hsluvToHex([hsluvColor[0], hsluvColor[1], lightness])
    ),
  };
}

const ColorForm = ({ colors, onSubmit }) => {
  const inputGroups = colors.map((color, index) => {
    return (
      <label>
        CSS Color Value {index + 1}
        <br />
        <input name={`color-${index}`} value={color.color} />
      </label>
    );
  });
  return (
    <form onSubmit={onSubmit}>
      <p>
        Enter any valid CSS color (hex, rgb, hsl, name) to generate color
        scales:
      </p>
      {inputGroups}
      <button>Generate Palette</button>
    </form>
  );
};

const CssCopy = ({ colors }) => {
  const css = colors
    .map((colorObject, objectIndex) => {
      return colorObject.scales
        .map((color, index) => {
          const cssColor = chroma(color).css("hsl");

          return `  --color-${objectIndex + 1}-${index * 10}: ${cssColor}`;
        })
        .join("\n");
    })
    .join("\n\n");
  console.log({ css });

  return (
    <pre>
      <code>
        {":root {\n"}
        {css}
        {"\n}"}
      </code>
    </pre>
  );
};

const Palette = () => {
  const [colors, setColors] = useState(INITIAL_STATE);

  const changeColors = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newColors = Array.from(formData.values());

    setColors(newColors.map((color) => getColorObject(color)));
  };

  console.log({ INITIAL_STATE });

  const colorRows = colors.map((color) => (
    <SingleColor color={color.color} scales={color.scales} />
  ));

  return (
    <div>
      <ColorForm colors={colors} onSubmit={changeColors} />
      {colorRows}
      <h2>Copy CSS</h2>
      <CssCopy colors={colors} />
    </div>
  );
};

export default Palette;
