import type { RGB, RawRGBA } from "../types";

/**
 * @name slice_alpha
 * @description slices off the alpha value of a 4-number RGBA pixel array,
 * leaving a new 3-Number RGB pixel array
 * @param {RGBA} pixel - an RGBA
 * @returns {RGBA} an RGBA pixel as an array of 4 numbers
 */
export default function sliceAlpha (pixel: RawRGBA): RGB {
  return pixel.slice(0, 3) as RGB;
}
