// prettier-ignore
export default function rgbToHex<
  R extends number | null,
  G extends number | null,
  B extends number | null
> ([r, g, b]: [R, G, B]) : string {
  return "#" + (r || 0).toString(16).padStart(2, "0") + (g || 0).toString(16).padStart(2, "0") + (b || 0).toString(16).padStart(2, "0");
}
