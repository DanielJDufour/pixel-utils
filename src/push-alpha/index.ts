import type { RGB, VisibleRGBA } from "../types";

/**
 * @description converts an RGB to an RGBA by pushing an alpha value at the end of the RGB array
 * @param rgb - a 3-number RGB pixel
 * @returns rgba - a 4-number array representing an RGBA pixel
 */
export default function pushAlpha(pixel: RGB): VisibleRGBA {
  pixel.push(255);
  return (pixel as unknown) as VisibleRGBA;
}
