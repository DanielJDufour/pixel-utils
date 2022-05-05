import { RGBA } from "../types";

// make a given rgba value transparent
export function setHidden(pixel: RGBA): RGBA {
  pixel[3] = 0;
  return pixel;
};
