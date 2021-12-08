import { shout } from "../utils";

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partOneShout = async (input = [] as string[]) => {
  shout("Hello from Part One!");
  // shout(input.toString());
};
