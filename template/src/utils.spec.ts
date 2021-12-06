import { range } from './utils';

test('range', () => {
  expect(range(0, 2)).toStrictEqual([0, 1, 2]);
});
