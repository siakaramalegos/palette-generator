import { hexToHsluv } from "hsluv";
import chroma from "chroma-js";

function getDark(colorChroma) {
  return colorChroma.desaturate().set("hsl.l", 0.05).hex();
}
function getLight(colorChroma) {
  return colorChroma.desaturate().set("hsl.l", 0.95).hex();
}

const HUE_SHIFTS = [10, 20, 30];
const RED_BLUE_BREAKPOINT = 240;
const MAX_HUE = 360;

function getRedShifted(hue, chromaColor) {
  return HUE_SHIFTS.map((shift, index) => {
    let redHue = hue < RED_BLUE_BREAKPOINT ? hue - shift : hue + shift;
    if (redHue < 0) {
      redHue = MAX_HUE + redHue;
    }
    return chromaColor.set("hsl.h", redHue).brighten(index + 1 / 1.2);
  });
}

function getBlueShifted(hue, chromaColor) {
  return HUE_SHIFTS.map((shift, index) => {
    let blueHue = hue < RED_BLUE_BREAKPOINT ? hue + shift : hue - shift;
    if (blueHue >= MAX_HUE) {
      blueHue = blueHue - MAX_HUE;
    }
    return chromaColor.set("hsl.h", blueHue).darken(index + 1 / 1.2);
  }).reverse();
}

function getShiftedScale(middleColor) {
  const hue = middleColor.get("hsl.h");
  const scale = [
    ...getBlueShifted(hue, middleColor),
    middleColor,
    ...getRedShifted(hue, middleColor),
  ];
  console.log({ scale });
  return scale.map((chromaColor) => chromaColor.hex());
}

export function getColorObject(color, mode = "lrgb", dark, light) {
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

  const middleColor = scale(0.5);
  const shiftedScale = getShiftedScale(middleColor);

  for (let index = 0; index <= STEPS; index++) {
    scales.push(scale(index / STEPS));
  }

  return {
    color,
    hsluvColor,
    scales,
    darkStart,
    lightEnd,
    shiftedScale,
  };
}
