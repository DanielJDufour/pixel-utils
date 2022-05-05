import type { RGBA } from "../types";

// make a given rgba value visible
export function set_visible(pixel: RGBA) {
  pixel[3] = 255;
  return pixel;
}
