import type { NoDataValue, RGB } from "../types";

export default function makeNoDataRGB (noDataValue: NoDataValue): RGB {
  return [noDataValue, noDataValue, noDataValue];
}
