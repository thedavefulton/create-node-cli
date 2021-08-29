import { shout } from './utils';

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

shout('Hello world!');
