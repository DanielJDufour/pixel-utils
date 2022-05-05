import { NoDataPixel, RGB, RawRGBA } from "../types";

import isHidden from "../is-hidden";
import popAlpha from "../pop-alpha";

export default function quickly_convert_rgba_to_rgb (
  noDataPixel: NoDataPixel,
  pixel: RawRGBA
): RGB {
  return isHidden(pixel) ? noDataPixel : popAlpha(pixel);
}
