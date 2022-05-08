import type { AnyRGBA, CleanRGBA } from "../types";

// make a given rgba value visible
export default function setVisible(pixel: AnyRGBA): CleanRGBA {
  pixel[3] = 255;
  return (pixel as unknown) as CleanRGBA;
}
