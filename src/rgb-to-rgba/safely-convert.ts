import type { NoDataValue, RGB, CleanRGBA } from "../types";

import addAlpha from "../add-alpha";
import isNoData from "../is-no-data";
import makeNoDataRGBA from "../make-no-data-rgba";

export default function safely_convert_rgb_to_rgba(old_no_data_value: NoDataValue, new_no_data_value: NoDataValue, pixel: RGB): CleanRGBA {
  return isNoData(old_no_data_value, pixel) ? makeNoDataRGBA(new_no_data_value) : addAlpha(pixel);
}
