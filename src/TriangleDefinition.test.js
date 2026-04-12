import { TriangleDefinition } from './TriangleDefinition';

describe('`class TriangleDefinition`', () => {
  test('`static matching()`', () => {
    var d = TriangleDefinition.matching({
      centerX: -20.4,
      centerY: 57,

      direction: 0.72,

      width: 25.1,
      height: 89,

      tailsHeight: 8.3,
    });

    expect(d.centerX).toBe(-20.4);
    expect(d.centerY).toBe(57);

    expect(d.direction).toBe(0.72);

    expect(d.width).toBe(25.1);
    expect(d.height).toBe(89);

    expect(d.tailsHeight).toBe(8.3);
  });

  test('`toString()`', () => {
    let d = new TriangleDefinition();

    d.centerX = 101.2;
    d.centerY = 26;

    d.direction = 0.4 - (Math.PI / 2);

    d.width = 24;
    d.height = 28;

    d.tailsHeight = 7.5;

    expect(d.toString()).toBe(
      'M 106.65185679232111 13.105146083959609'
      + ' L 106.80087513571351 43.567874023744196'
      + ' L 98.66878077499378 31.986896461018752'
      + ' L 84.69541127964428 34.221833808336584'
      + ' Z'
    );
  });
});
