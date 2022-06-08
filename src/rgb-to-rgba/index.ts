import addAlpha from "../add-alpha";
import pushAlpha from "../push-alpha";
import makeNoDataRGBA from "../make-no-data-rgba";
import safely_convert from "./safely-convert";
import quickly_convert from "./quickly-convert";

import { NoDataValue, RGB, CleanRGBA } from "../types";

export default function rgbToRgba({
  old_no_data_value,
  new_no_data_value = null,
  safe = true
}: {
  old_no_data_value?: NoDataValue;
  new_no_data_value?: NoDataValue;
  safe?: boolean;
} = {}): (px: RGB) => CleanRGBA {
  if (typeof old_no_data_value === "number") {
    if (safe) {
      // @ts-ignore
      return safely_convert.bind(null, old_no_data_value, new_no_data_value);
    } else {
      const new_no_data_pixel = makeNoDataRGBA(new_no_data_value); // we will reuse this no data pixel
      // @ts-ignore
      return quickly_convert.bind(null, old_no_data_value, new_no_data_pixel);
    }
  } else {
    if (safe) {
      return addAlpha;
    } else {
      return pushAlpha;
    }
  }
}
