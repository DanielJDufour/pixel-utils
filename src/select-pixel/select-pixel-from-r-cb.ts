// each row is its own array
export default function select_r_cb(data, depth, r, c) {
  const pixel = [];
  const row = data[r];
  let i = c * depth;
  const imax = i + depth;
  for (; i < imax; i++) {
    pixel.push(row[i]);
  }
  return pixel;
}
