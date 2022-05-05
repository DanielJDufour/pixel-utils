import type { NoDataValue, CleanRGBA } from "../types";

export default function makeNoDataRGBA (noDataValue: NoDataValue): CleanRGBA {
  return [noDataValue, noDataValue, noDataValue, 0];
}
