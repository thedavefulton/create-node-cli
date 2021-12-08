import { max, min, range, reverse, zip } from "./utils";

test("reverse", () => {
  expect(reverse([0, 1, 2])).toStrictEqual([2, 1, 0]);
});

test("range", () => {
  expect(range(0, 2)).toStrictEqual([0, 1, 2]);
  expect(range(2, 0)).toStrictEqual([2, 1, 0]);
});

test("zip", () => {
  expect(zip([0, 0, 0], [1, 1, 1])).toStrictEqual([
    [0, 1],
    [0, 1],
    [0, 1],
  ]);
});

test("min", () => {
  expect(min([2, 1, 0])).toBe(0);
  expect(min([1, 2, 3])).toBe(1);
});

test("max", () => {
  expect(max([2, 1, 0])).toBe(2);
  expect(max([1, 2, 3])).toBe(3);
});
