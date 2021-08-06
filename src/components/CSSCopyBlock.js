import { h } from "preact";
import chroma from "chroma-js";

function getCssColors(colorArray, objectIndex, modifier = "-") {
  return colorArray
    .map((color, index) => {
      const cssColor = chroma(color).css("hsl");

      return `  --col-${objectIndex + 1}${modifier}${index * 10}: ${cssColor};`;
    })
    .join("\n");
}
const CSSCopyBlock = ({ colors }) => {
  const cssGreyScales = colors
    .map((colorObject, objectIndex) => {
      return getCssColors(colorObject.scales.reverse(), objectIndex);
    })
    .join("\n\n");
  const cssShiftedScales = colors
    .map((colorObject, objectIndex) => {
      return getCssColors(
        colorObject.shiftedScale.reverse(),
        objectIndex,
        "-shift-"
      );
    })
    .join("\n\n");

  return (
    <pre>
      <code>
        {":root {\n  /* Grey scales */\n"}
        {cssGreyScales}
        {"\n\n  /* Shifted scales */\n"}
        {cssShiftedScales}
        {"\n}"}
      </code>
    </pre>
  );
};

export default CSSCopyBlock;
