// like ImageData.data
export default function select_rcb(data, depth, width, r, c) {
  const pixel = [];
  let i = (r * width + c) * depth;
  const imax = i + depth;
  for (; i < imax; i++) {
    pixel.push(data[i]);
  }
  return pixel;
}
