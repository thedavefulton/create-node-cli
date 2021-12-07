import { readFile, shout } from "../utils";

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partOneShout = async () => {
  // const lines = await readFile();

  shout("Hello from Part One!");
};
