import type { RawRGBA, CleanRGBA } from "../types";

/**
 * @name show_rgba
 * @description make a given (scaled) rgba value transparent/invisble
 * @param {RGBA} rgba pixel
 * @returns a new rgba pixel with the same Red, Green and Blue values and a 0 alpha value
 */
export default function hide_rgba([r, g, b]: RawRGBA): CleanRGBA {
  return [r, g, b, 0];
}
