import { shout } from './utils';

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partTwoShout = () => shout('Hello from Part Two!');
