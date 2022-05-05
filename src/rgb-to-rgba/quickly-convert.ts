import isNoData from "../is-no-data";
import pushAlpha from "../push-alpha";
import type { NoDataPixelRGBA, NoDataValue, CleanRGBA } from "../types";

export default function quickly_convert(
  old_no_data_value: NoDataValue,
  new_no_data_pixel: NoDataPixelRGBA,
  px
): CleanRGBA {
  return isNoData(old_no_data_value, px) ? new_no_data_pixel : pushAlpha(px);
}
