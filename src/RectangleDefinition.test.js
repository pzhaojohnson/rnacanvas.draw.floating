import { RectangleDefinition } from './RectangleDefinition';

describe('`class RectangleDefinition`', () => {
  test('`static matching()`', () => {
    var d = RectangleDefinition.matching({
      centerX: -20,
      centerY: 29,

      direction: -5 * Math.PI / 4,

      width: 82,
      height: 56,

      cornerRadius: 27,
    });

    expect(d.centerX).toBe(-20);
    expect(d.centerY).toBe(29);

    expect(d.direction).toBe(-5 * Math.PI / 4);

    expect(d.width).toBe(82);
    expect(d.height).toBe(56);

    expect(d.cornerRadius).toBe(27);
  });

  test('`toString()`', () => {
    var d = new RectangleDefinition();

    d.centerX = 30;
    d.centerY = 20;

    d.direction = -0.5 - (Math.PI / 2);

    d.width = 100;
    d.height = 42;

    d.cornerRadius = 18;

    expect(d.toString()).toBe(
      'M 48.01470566980367 -13.770851035032322'
      + ' A 18 18 90 0 1 72.44085147870604 -6.604024615881267'
      + ' L 75.31740471033126 -1.338529244539031'
      + ' A 18 18 90 0 1 68.15057829118021 23.087616564363334'
      + ' L 11.98529433019636 53.77085103503234'
      + ' A 18 18 90 0 1 -12.440851478706008 46.604024615881286'
      + ' L -15.317404710331227 41.338529244539046'
      + ' A 18 18 90 0 1 -8.150578291180175 16.912383435636677'
      + ' Z'
    );
  });
});
