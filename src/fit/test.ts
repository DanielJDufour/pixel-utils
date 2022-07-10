import findAndRead from "find-and-read";
import test from "flug";

import fit from "./index";

const csv = findAndRead("eu_pasture.csv", { encoding: "utf-8" });
const lines = csv.split("\n").filter(ln => ln !== "");
const data: number[] = lines.map(ln => Number.parseFloat(ln));
const old_no_data_value = -3.40282e38;

const index_of_first_valid_value = data.findIndex(n => n !== old_no_data_value);
const first_valid_value = data[index_of_first_valid_value];
if (first_valid_value !== 0) throw Error("unexpected first_valid_value");

const count_of_no_data = data.filter(n => n === old_no_data_value).length;
if (count_of_no_data !== 439_256) throw Error("unexpected count_of_no_data");
const count_of_data = data.length - count_of_no_data;
if (count_of_data !== 109_424) throw Error("unexpected count_of_data");

const height = 638;
const width = 860;

const index_of_first_valid_rgba = 4 * index_of_first_valid_value;

test("fit: single-band", async ({ eq }) => {
  const result = fit({
    data,
    debug_level: 0,
    depth: 1,
    old_layout: "[band,row,column]",
    height,
    old_no_data_value,
    new_no_data_value: 0,
    ranges: [[0, 1]],
    width
  }) as { data: number[]; layout: string };

  const top_left_pixel = result.data.slice(0, 4);
  eq(top_left_pixel, [0, 0, 0, 0]);

  const first_valid_rgba = result.data.slice(index_of_first_valid_rgba, index_of_first_valid_rgba + 4);
  eq(first_valid_rgba, [1, 1, 1, 255]); // 1 because zero is reserved as the new no data value

  const uniques = Array.from(new Set(result.data));
  eq(uniques.length, 256);

  const alphas = result.data.filter((n, i) => (i + 1) % 4 === 0);
  eq(alphas.length, height * width);
  eq(Array.from(new Set(alphas)).sort(), [0, 255]);
  eq(alphas.filter(n => n === 0).length, count_of_no_data);
  eq(alphas.filter(n => n === 255).length, count_of_data);

  const reds = result.data.filter((n, i) => (i + 4) % 4 === 0);
  eq(reds.length, height * width);
  eq(new Set(reds).size, 256);
  eq(reds.filter(n => n === 0).length, count_of_no_data);
  eq(reds.filter(n => n === 1).length, 31_811);
  eq(reds.filter(n => n === 254).length, 11);
  eq(reds.filter(n => n === 255).length, 79);
});

test("fit: single-band flip=true", async ({ eq }) => {
  const result = fit({
    data,
    debug_level: 0,
    depth: 1,
    flip: true,
    old_layout: "[band,row,column]",
    height,
    old_no_data_value,
    new_no_data_value: 0,
    ranges: [[0, 1]],
    width
  }) as { data: number[]; layout: string };

  const top_left_pixel = result.data.slice(0, 4);
  eq(top_left_pixel, [0, 0, 0, 0]);

  const index_of_first_valid_rgba = 4 * index_of_first_valid_value;
  const first_valid_rgba = result.data.slice(index_of_first_valid_rgba, index_of_first_valid_rgba + 4);
  eq(first_valid_rgba, [255, 255, 255, 255]); // original value is zero, but flipped, so its 255

  const uniques = Array.from(new Set(result.data));
  eq(uniques.length, 256);

  const alphas = result.data.filter((n, i) => (i + 1) % 4 === 0);
  eq(alphas.length, height * width);
  eq(Array.from(new Set(alphas)).sort(), [0, 255]);
  eq(alphas.filter(n => n === 0).length, count_of_no_data);
  eq(alphas.filter(n => n === 255).length, count_of_data);

  const reds = result.data.filter((n, i) => (i + 4) % 4 === 0);
  eq(reds.length, height * width);
  eq(new Set(reds).size, 256);
  eq(reds.filter(n => n === 0).length, count_of_no_data);
  eq(reds.filter(n => n === 1).length, 79);
  eq(reds.filter(n => n === 254).length, 1125);
  eq(reds.filter(n => n === 255).length, 31811);
});

test("fit: single-band flip=true new_no_data_value=255", async ({ eq }) => {
  const result = fit({
    data,
    debug_level: 0,
    depth: 1,
    flip: true,
    old_layout: "[band,row,column]",
    height,
    old_no_data_value,
    new_no_data_value: 255,
    ranges: [[0, 1]],
    width
  }) as { data: number[]; layout: string };

  const top_left_pixel = result.data.slice(0, 4);
  eq(top_left_pixel, [255, 255, 255, 0]);

  const index_of_first_valid_rgba = 4 * index_of_first_valid_value;
  const first_valid_rgba = result.data.slice(index_of_first_valid_rgba, index_of_first_valid_rgba + 4);
  eq(first_valid_rgba, [254, 254, 254, 255]); // original value is zero, but flipped, so its 255

  const uniques = Array.from(new Set(result.data));
  eq(uniques.length, 256);

  const alphas = result.data.filter((n, i) => (i + 1) % 4 === 0);
  eq(alphas.length, height * width);
  eq(Array.from(new Set(alphas)).sort(), [0, 255]);
  eq(alphas.filter(n => n === 0).length, count_of_no_data);
  eq(alphas.filter(n => n === 255).length, count_of_data);

  const reds = result.data.filter((n, i) => (i + 4) % 4 === 0);
  eq(reds.length, height * width);
  eq(new Set(reds).size, 256);
  eq(reds.filter(n => n === 0).length, 79);
  eq(reds.filter(n => n === 1).length, 11);
  eq(reds.filter(n => n === 254).length, 31_811);
  eq(reds.filter(n => n === 255).length, count_of_no_data);
});
