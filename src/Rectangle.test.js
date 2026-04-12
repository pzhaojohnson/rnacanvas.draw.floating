/**
 * @jest-environment jsdom
 */

import { Rectangle } from './Rectangle';

import { RectangleDefinition } from './RectangleDefinition';

import { uuidRegex } from './uuidRegex';

import { Box } from '@rnacanvas/boxes';

import { DrawingMock } from './DrawingMock';

beforeAll(() => {
  if (!globalThis.SVGPathElement) {
    globalThis.SVGPathElement = SVGElement;
  }

  if (!SVGPathElement.prototype.getBBox) {
    SVGPathElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 0, height: 0 });
  }
});

describe('`class Rectangle`', () => {
  test('`static create()`', () => {
    var rectangle = Rectangle.create();

    // assigns a UUID
    expect(rectangle.domNode.getAttribute('id')).toMatch(uuidRegex);

    // IDs must start with a letter for SVG elements
    expect(rectangle.domNode.getAttribute('id').substring(0, 3)).toBe('id-');

    // no extra (possibly not-allowed) characters
    expect(rectangle.domNode.getAttribute('id').length).toBe(3 + 36);

    // assigns some default values (exact values may be changed)
    expect(rectangle.width).toBeCloseTo(5.5);
    expect(rectangle.height).toBeCloseTo(5.5);
    expect(rectangle.domNode.getAttribute('stroke')).toBe('black');
    expect(rectangle.domNode.getAttribute('stroke-width')).toBe('1');
    expect(rectangle.domNode.getAttribute('fill')).toBe('white');
  });

  test('`constructor()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    domNode.id = 'id-7618427647284';

    domNode.getBBox = () => ({ x: -20, y: 57, width: 84, height: 200 });

    var rectangle = new Rectangle(domNode);

    // stores DOM node reference
    expect(rectangle.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();

    // doesn't overwrite ID
    expect(domNode.getAttribute('id')).toBe('id-7618427647284');

    // caches center X and Y coordinates
    expect(Number.parseFloat(domNode.dataset.centerX)).toBeCloseTo(22);
    expect(Number.parseFloat(domNode.dataset.centerY)).toBeCloseTo(157);

    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    domNode.getBBox = () => ({ x: -20, y: 57, width: 84, height: 200 });

    domNode.dataset.centerX = '-1000';
    domNode.dataset.centerY = '-2000';

    var rectangle = new Rectangle(domNode);

    // doesn't overwrite already cached center X and Y coordinates
    expect(domNode.dataset.centerX).toBe('-1000');
    expect(domNode.dataset.centerY).toBe('-2000');
  });

  test('`get id()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    domNode.id = 'id-868621542';

    var rectangle = new Rectangle(domNode);

    expect(rectangle.id).toBe('id-868621542');
  });

  test('`get centerX()`', () => {
    var rectangle = Rectangle.create();

    rectangle.domNode.dataset.centerX = '57.2';

    expect(rectangle.centerX).toBe(57.2);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      rectangle.domNode.dataset.centerX = `${value}`;

      expect(rectangle.centerX).toBe(0);
    });
  });

  test('`set centerX()`', () => {
    var rectangle = Rectangle.create();

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    rectangle.centerX = -82.9;

    expect(rectangle.centerX).toBeCloseTo(-82.9);

    // caches value
    expect(Number.parseFloat(rectangle.domNode.dataset.centerX)).toBeCloseTo(-82.9);

    // repositions rectangle
    expect(rectangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(rectangle.domNode.getAttribute('d')).toBe(RectangleDefinition.matching(rectangle).toString());

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      rectangle.centerX = value;

      // unchanged
      expect(rectangle.centerX).toBeCloseTo(-82.9);
      expect(rectangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get centerY()`', () => {
    var rectangle = Rectangle.create();

    rectangle.domNode.dataset.centerY = '18.2';

    expect(rectangle.centerY).toBe(18.2);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      rectangle.domNode.dataset.centerY = `${value}`;

      expect(rectangle.centerY).toBe(0);
    });
  });

  test('`set centerY()`', () => {
    var rectangle = Rectangle.create();

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    rectangle.centerY = 28.77;

    expect(rectangle.centerY).toBeCloseTo(28.77);

    // caches value
    expect(Number.parseFloat(rectangle.domNode.dataset.centerY)).toBeCloseTo(28.77);

    // repositions rectangle
    expect(rectangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(rectangle.domNode.getAttribute('d')).toBe(RectangleDefinition.matching(rectangle).toString());

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      rectangle.centerY = value;

      // unchanged
      expect(rectangle.centerY).toBeCloseTo(28.77);
      expect(rectangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`drag()`', () => {
    var rectangle = Rectangle.create();

    rectangle.centerX = 57;
    rectangle.centerY = -12;

    var d = rectangle.domNode.getAttribute('d');

    rectangle.drag(24, -9);

    expect(rectangle.centerX).toBeCloseTo(81);
    expect(rectangle.centerY).toBeCloseTo(-21);

    // repositioned rectangle
    expect(rectangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(rectangle.domNode.getAttribute('d')).toBe(RectangleDefinition.matching(rectangle).toString());
  });

  test('`get direction()`', () => {
    var rectangle = Rectangle.create();

    rectangle.domNode.dataset.direction = '0.59';

    expect(rectangle.direction).toBe(0.59);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      rectangle.domNode.dataset.direction = `${value}`;

      expect(rectangle.direction).toBe(0);
    });
  });

  test('`set direction()`', () => {
    var rectangle = Rectangle.create();

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    rectangle.direction = -1.28;

    expect(rectangle.direction).toBeCloseTo(-1.28);

    // caches value
    expect(Number.parseFloat(rectangle.domNode.dataset.direction)).toBeCloseTo(-1.28);

    // repositions rectangle
    expect(rectangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(rectangle.domNode.getAttribute('d')).toBe(RectangleDefinition.matching(rectangle).toString());

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      rectangle.direction = value;

      // unchanged
      expect(rectangle.direction).toBeCloseTo(-1.28);
      expect(rectangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get width()`', () => {
    var rectangle = Rectangle.create();

    rectangle.domNode.dataset.width = '8.87';

    expect(rectangle.width).toBe(8.87);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      rectangle.domNode.dataset.width = `${value}`;

      expect(rectangle.width).toBe(0);
    });
  });

  test('`set width()`', () => {
    var rectangle = Rectangle.create();

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    rectangle.width = 20.9;

    expect(rectangle.width).toBeCloseTo(20.9);

    // caches value
    expect(Number.parseFloat(rectangle.domNode.dataset.width)).toBeCloseTo(20.9);

    // repositions rectangle
    expect(rectangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(rectangle.domNode.getAttribute('d')).toBe(RectangleDefinition.matching(rectangle).toString());

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      rectangle.width = value;

      // unchanged
      expect(rectangle.width).toBeCloseTo(20.9);
      expect(rectangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get height()`', () => {
    var rectangle = Rectangle.create();

    rectangle.domNode.dataset.height = '12.5';

    expect(rectangle.height).toBe(12.5);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      rectangle.domNode.dataset.height = `${value}`;

      expect(rectangle.height).toBe(0);
    });
  });

  test('`set height()`', () => {
    var rectangle = Rectangle.create();

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    rectangle.height = 77.2;

    expect(rectangle.height).toBeCloseTo(77.2);

    // caches value
    expect(Number.parseFloat(rectangle.domNode.dataset.height)).toBeCloseTo(77.2);

    // repositions rectangle
    expect(rectangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(rectangle.domNode.getAttribute('d')).toBe(RectangleDefinition.matching(rectangle).toString());

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      rectangle.height = value;

      // unchanged
      expect(rectangle.height).toBeCloseTo(77.2);
      expect(rectangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get cornerRadius()`', () => {
    var rectangle = Rectangle.create();

    rectangle.domNode.dataset.cornerRadius = '3.08';

    expect(rectangle.cornerRadius).toBe(3.08);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      rectangle.domNode.dataset.cornerRadius = `${value}`;

      expect(rectangle.cornerRadius).toBe(0);
    });
  });

  test('`set cornerRadius()`', () => {
    var rectangle = Rectangle.create();

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    rectangle.cornerRadius = 8.21;

    expect(rectangle.cornerRadius).toBeCloseTo(8.21);

    // caches value
    expect(Number.parseFloat(rectangle.domNode.dataset.cornerRadius)).toBeCloseTo(8.21);

    // repositions rectangle
    expect(rectangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(rectangle.domNode.getAttribute('d')).toBe(RectangleDefinition.matching(rectangle).toString());

    var d = rectangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      rectangle.cornerRadius = value;

      // unchanged
      expect(rectangle.cornerRadius).toBeCloseTo(8.21);
      expect(rectangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get bbox()`', () => {
    var rectangle = Rectangle.create();

    rectangle.domNode.getBBox = () => ({ x: -80, y: 120, width: 54, height: 800 });

    expect(rectangle.bbox).toBeInstanceOf(Box);

    expect(rectangle.bbox.x).toBe(-80);
    expect(rectangle.bbox.y).toBe(120);
    expect(rectangle.bbox.width).toBe(54);
    expect(rectangle.bbox.height).toBe(800);
  });

  test('`serialized()`', () => {
    var rectangle = Rectangle.create();

    rectangle.domNode.id = 'id-251482894';

    var savedRectangle = rectangle.serialized();

    expect(savedRectangle.id).toBe('id-251482894');

    // is JSON-serializable
    expect(() => JSON.stringify(savedRectangle)).not.toThrow();

    rectangle.domNode.id = '';

    // throws if ID is falsy
    expect(() => rectangle.serialized()).toThrow();
  });

  test('`static recreate()`', () => {
    var rectangle1 = Rectangle.create();

    var parentDrawing = new DrawingMock();

    expect(parentDrawing.domNode.childNodes.length).toBeGreaterThanOrEqual(20);

    // add to drawing
    parentDrawing.domNode.insertBefore(rectangle1.domNode, parentDrawing.domNode.childNodes[15]);

    expect(parentDrawing.domNode.childNodes[15]).toBe(rectangle1.domNode);

    var savedRectangle = rectangle1.serialized();

    // some properties used to be saved as JSON object properties
    savedRectangle.width = 29.4;
    savedRectangle.height = 54.5;

    // corner radius used to be called border radius
    savedRectangle.borderRadius = 4.82;

    // direction used to correspond with rotation
    savedRectangle.rotation = 3 * Math.PI / 2;

    var rectangle2 = Rectangle.recreate(savedRectangle, parentDrawing);

    // found DOM node
    expect(rectangle2.domNode).toBe(rectangle1.domNode);

    expect(rectangle2.domNode).toBeTruthy();
    expect(rectangle2).not.toBe(rectangle1);

    // reads in legacy properties
    expect(rectangle2.width).toBe(29.4);
    expect(rectangle2.height).toBe(54.5);

    expect(rectangle2.cornerRadius).toBe(4.82);

    // converts rotation to direction (subtracts Math.PI / 2)
    expect(rectangle2.direction).toBeCloseTo(Math.PI);
  });
});
