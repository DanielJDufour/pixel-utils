export default function select_b_r_c(data, depth, r, c) {
  const pixel = [];
  for (let b = 0; b < depth; b++) {
    pixel.push(data[b][r][c]);
  }
  return pixel;
}
