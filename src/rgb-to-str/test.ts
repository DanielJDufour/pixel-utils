import test from "flug";
import rgbToStr from "./index";

test("rgbToStr", ({ eq }) => {
  eq(rgbToStr([null, 255, 255]), "rgb(null, 255, 255)");
  eq(rgbToStr([0, 0, 0]), "rgb(0, 0, 0)");
  eq(rgbToStr([255, 255, 255]), "rgb(255, 255, 255)");
});
