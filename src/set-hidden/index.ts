import { AnyRGBA, CleanRGBA } from "../types";

// make a given rgba value transparent
export default function setHidden(pixel: AnyRGBA): CleanRGBA {
  pixel[3] = 0;
  return (pixel as unknown) as CleanRGBA;
}
