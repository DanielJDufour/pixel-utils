export default function makeNoDataRgbaString<T extends number | string>(noDataValue: T): `rgba(${T}, ${T}, ${T}, 0)` {
  return `rgba(${noDataValue}, ${noDataValue}, ${noDataValue}, 0)`;
}
