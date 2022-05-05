import type { AnyRGBA } from "../types";

/**
 * @description check if an RGBA pixel is hidden
 * @param {number[]} pixel - an array of 4 numbers representing [R, G, B, A]
 * @returns {boolean} whether the pixel is hidden
 */
export default function isHidden(pixel: AnyRGBA): boolean {
  return pixel[3] === 0;
}
