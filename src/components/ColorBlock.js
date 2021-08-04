import { h } from "preact";

const ColorBlock = ({ color, width }) => {
  return (
    <div
      className="color-block"
      style={{
        backgroundColor: color,
        width: width,
      }}
    ></div>
  );
};

export default ColorBlock;
