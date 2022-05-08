import { NoDataValue, RGB, RawRGBA } from "../types";

import isHidden from "../is-hidden";
import makeNoDataRGB from "../make-no-data-rgb";
import sliceAlpha from "../slice-alpha";

export default function safely_convert_rgba_to_rgb(noDataValue: NoDataValue, pixel: RawRGBA): RGB {
  return isHidden(pixel) ? makeNoDataRGB(noDataValue) : sliceAlpha(pixel);
}
