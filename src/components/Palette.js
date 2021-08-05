import { h } from "preact";
import { useState } from "preact/hooks";
import SingleColor from "./SingleColor";

const ColorForm = ({ colors, onSubmit }) => {
  const inputGroups = colors.map((color, index) => {
    return (
      <label>
        CSS Color Value {index + 1}
        <br />
        <input name={`color-${index}`} value={color} />
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

const Palette = () => {
  const [colors, setColors] = useState(["#ff0000", "#0000ff"]);
  const changeColors = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newColors = Array.from(formData.values());

    setColors(newColors);
  };

  const colorRows = colors.map((color) => <SingleColor color={color} />);

  return (
    <div>
      <ColorForm colors={colors} onSubmit={changeColors} />
      {colorRows}
    </div>
  );
};

export default Palette;
