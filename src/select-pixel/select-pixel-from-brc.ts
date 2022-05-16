export default function select_brc(data, depth, height, width, r, c) {
  const pixel = [];
  const size = height * width;
  const i = r * width + c;
  for (let b = 0; b < depth; b++) {
    pixel.push(data[b * size + i]);
  }
  return pixel;
}
