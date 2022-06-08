/**
 * @description converts an RGB to an RGBA by pushing an alpha value at the end of the RGB array
 * @param rgb - a 3-number RGB pixel
 * @returns rgba - a 4-number array representing an RGBA pixel
 */
export default function pushAlpha<R, G, B>(pixel: [R, G, B]): [R, G, B, 255] {
  // @ts-ignore
  pixel.push(255);
  // @ts-ignore
  return pixel;
}
