import type { RGB, RawRGBA } from "../types";
/**
 * 
 * @param {Pixel} pixel - an RGBA Pixel, an Array of 4 Numbers [Red, Green, Blue, Alpha]
 * @returns {RGBA} an RGB Pixel, an Array of 3 Numbers [Red, Green, Blue]
 */
export default function pop_alpha (pixel: RawRGBA) {
  pixel.pop();
  return pixel as unknown as RGB;
}
