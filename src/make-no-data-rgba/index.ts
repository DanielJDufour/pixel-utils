import type { NoDataValue, CleanRGBA } from "../types";

export default function makeNoDataRgba(noDataValue: NoDataValue): CleanRGBA {
  return [noDataValue, noDataValue, noDataValue, 0];
}
