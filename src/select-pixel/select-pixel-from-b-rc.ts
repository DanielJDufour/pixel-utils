export default function select_b_rc(data, depth, width, r, c) {
  const pixel = [];
  const i = r * width + c;
  for (let b = 0; b < depth; b++) {
    pixel.push(data[b][i]);
  }
  return pixel;
}
