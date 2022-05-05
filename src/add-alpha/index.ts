import type { RGB, VisibleRGBA } from "../types";

/**
 * @description adds an alpha channel, creating a new RGBA pixel from an RGB pixel
 * @param rgb - a 3-number RGB pixel
 * @returns rgba - a 4-number array representing an RGBA pixel
 */
export default function addAlpha(rgb: RGB): VisibleRGBA {
  return [...rgb, 255];
}
