import test from "flug";
import pushAlpha from "./index";

test("pushAlpha", ({ eq }) => {
  eq(pushAlpha([123, 5, 31]), [123, 5, 31, 255]);
  eq(pushAlpha([123, null, 31]), [123, null, 31, 255]);
});
