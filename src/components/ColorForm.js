import { h } from "preact";

// TODO: add delete color feature
// TODO: add steps
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
        <label for={`color-${index}`}>Select Color</label>
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
      <p>Select colors to generate color scales.</p>
      {inputGroups}
      <p>
        <button type="button" onClick={addColor}>
          + Add color
        </button>
      </p>
      <fieldset>
        <legend>Options</legend>
        <label for="mode">Mode</label>
        <select name="mode" id="mode">
          {modeOptions}
        </select>
      </fieldset>
      <p>
        <button className="btn-primary">Generate Palette</button>
      </p>
    </form>
  );
};

export default ColorForm;
