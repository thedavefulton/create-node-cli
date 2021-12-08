import { shout } from "../utils";

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partTwoShout = async (input = [] as string[]) => {
  shout("Hello from Part Two!");
  // shout(input.toString());
};
