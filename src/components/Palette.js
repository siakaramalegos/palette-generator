import { h } from "preact";
import { useState } from "preact/hooks";
import { hexToHsluv } from "hsluv";
import SingleColor from "./SingleColor";
import chroma from "chroma-js";

const INITIAL_COLORS = ["#ff0000", "#0000ff"];
const INITIAL_STATE = INITIAL_COLORS.map((color) => getColorObject(color));

function boxedValue(value, min = 0, max = 100) {
  return Math.max(0, Math.min(value, 100));
}

function getDark(colorChroma) {
  return colorChroma.desaturate().set("hsl.l", 0.05).hex();
}
function getLight(colorChroma) {
  return colorChroma.desaturate().set("hsl.l", 0.95).hex();
}

function getColorObject(color, mode = "lrgb", dark, light) {
  const STEPS = 10;
  const colorChroma = chroma(color);
  const hex = colorChroma.hex();
  const hsluvColor = hexToHsluv(hex);
  // TODO: maybe switch to chroma
  const luminance = hsluvColor[2] / 100;
  const darkStart = dark ? dark : getDark(colorChroma);
  const lightEnd = light ? light : getLight(colorChroma);

  const scale = chroma
    .scale([darkStart, hex, lightEnd])
    .mode(mode)
    .domain([0, luminance, 1]);
  let scales = [];

  for (let index = 0; index <= STEPS; index++) {
    scales.push(scale(index / STEPS));
  }

  return {
    color,
    hsluvColor,
    scales,
    darkStart,
    lightEnd,
  };
}

// TODO: add delete color feature
const ColorForm = ({ colors, onSubmit, addColor, mode }) => {
  const modes = ["lrgb", "rgb", "lab"];
  const modeOptions = modes.map((modeOption) => {
    return (
      <option value={modeOption} selected={modeOption === mode}>
        {modeOption}
      </option>
    );
  });
  const inputGroups = colors.map((color, index) => {
    return (
      <fieldset>
        <legend>Color {index + 1}</legend>
        <label for={`color-${index}`}>CSS Color Value</label>
        <input
          type="color"
          id={`color-${index}`}
          name={`color-${index}`}
          value={color.color}
        />
      </fieldset>
    );
  });

  return (
    <form onSubmit={onSubmit}>
      <p>Enter a CSS color (hex, rgb, hsl) to generate color scales.</p>
      {inputGroups}
      <p>
        <button type="button" onClick={addColor}>
          Add color
        </button>
      </p>
      <fieldset>
        <legend>Options</legend>
        <label for="mode">Mode</label>
        <select name="mode" id="mode">
          {modeOptions}
        </select>
      </fieldset>
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

          return `  --color-${objectIndex + 1}-${index * 10}: ${cssColor};`;
        })
        .join("\n");
    })
    .join("\n\n");

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
  const [mode, setMode] = useState("lrgb");
  const addColor = () => {
    setColors([...colors, getColorObject("#ffffff")]);
  };
  const changeColors = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newColors = Array.from(formData.values()).filter((color) =>
      chroma.valid(color)
    );
    const mode = formData.get("mode");

    setColors(newColors.map((color) => getColorObject(color, mode)));
    setMode(mode);
  };

  const colorRows = colors.map((color) => (
    <SingleColor color={color.color} scales={color.scales} />
  ));

  return (
    <div>
      <ColorForm
        colors={colors}
        onSubmit={changeColors}
        addColor={addColor}
        mode={mode}
      />
      {colorRows}
      <h2>Copy CSS</h2>
      <CssCopy colors={colors} />
    </div>
  );
};

export default Palette;
