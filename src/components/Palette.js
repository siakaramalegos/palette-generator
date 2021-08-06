import { h } from "preact";
import { useState } from "preact/hooks";
import chroma from "chroma-js";
import { getColorObject } from "../helpers/colorHelpers";
import ColorForm from "./ColorForm";
import SingleColor from "./SingleColor";
import CSSCopyBlock from "./CSSCopyBlock";

const INITIAL_COLORS = ["#ff0000", "#0000ff"];
const INITIAL_STATE = INITIAL_COLORS.map((color) => getColorObject(color));

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

  const shiftedRows = colors.map((color) => (
    <SingleColor color={color.color} scales={color.shiftedScale} />
  ));

  return (
    <div>
      <ColorForm
        colors={colors}
        onSubmit={changeColors}
        addColor={addColor}
        mode={mode}
      />
      <h2>Grey Scales</h2>
      {colorRows}
      <h2>Color-Shifted Scales</h2>
      {shiftedRows}
      <h2>Copy CSS</h2>
      <CSSCopyBlock colors={colors} />
    </div>
  );
};

export default Palette;
