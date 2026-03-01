import { addNum } from './math.js';

// function addNum(a, b) {
//   return a + b;
// }

test('add two Numbers', () => {
    expect(addNum(2, 3)).toBe(5);
    expect(addNum(-1, 1)).toBe(0);
});

test('num greater than 0', ()=>{
     expect(addNum(2, 2)).toBeGreaterThan(0);
});