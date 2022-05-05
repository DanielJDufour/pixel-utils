import type { CleanRGBA, RawRGBA } from "../types";

/**
 * @name show_rgba
 * @description // make a given (scaled) rgba value visible
 * @param {RGBA} rgba pixel
 * @returns a new rgba pixel with the same Red, Green and Blue values and a 255 alpha value
 */
export default function showRGBA([r, g, b]: RawRGBA): CleanRGBA {
  return [r, g, b, 255];
}
