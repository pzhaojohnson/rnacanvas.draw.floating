/**
 * @jest-environment jsdom
 */

import { Triangle } from './Triangle';

import { TriangleDefinition } from './TriangleDefinition';

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

describe('`class Triangle`', () => {
  test('`static create()`', () => {
    var triangle = Triangle.create();

    // assigns a UUID
    expect(triangle.domNode.getAttribute('id')).toMatch(uuidRegex);

    // IDs must start with a letter for SVG elements
    expect(triangle.domNode.getAttribute('id').substring(0, 3)).toBe('id-');

    // no extra (possibly not-allowed) characters
    expect(triangle.domNode.getAttribute('id').length).toBe(3 + 36);

    // assigns some default values (exact values may be changed)
    expect(triangle.width).toBeCloseTo(6.5);
    expect(triangle.height).toBeCloseTo(6.5);
    expect(triangle.domNode.getAttribute('stroke')).toBe('black');
    expect(triangle.domNode.getAttribute('stroke-width')).toBe('1');
    expect(triangle.domNode.getAttribute('fill')).toBe('white');
  });

  test('`constructor()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    domNode.id = 'id-7618427647284';

    domNode.getBBox = () => ({ x: -20, y: 57, width: 84, height: 200 });

    var triangle = new Triangle(domNode);

    // stores DOM node reference
    expect(triangle.domNode).toBe(domNode);

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

    var triangle = new Triangle(domNode);

    // doesn't overwrite already cached center X and Y coordinates
    expect(domNode.dataset.centerX).toBe('-1000');
    expect(domNode.dataset.centerY).toBe('-2000');
  });

  test('`get id()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    domNode.id = 'id-868621542';

    var triangle = new Triangle(domNode);

    expect(triangle.id).toBe('id-868621542');
  });

  test('`get centerX()`', () => {
    var triangle = Triangle.create();

    triangle.domNode.dataset.centerX = '57.2';

    expect(triangle.centerX).toBe(57.2);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      triangle.domNode.dataset.centerX = `${value}`;

      expect(triangle.centerX).toBe(0);
    });
  });

  test('`set centerX()`', () => {
    var triangle = Triangle.create();

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    triangle.centerX = -82.9;

    expect(triangle.centerX).toBeCloseTo(-82.9);

    // caches value
    expect(Number.parseFloat(triangle.domNode.dataset.centerX)).toBeCloseTo(-82.9);

    // repositions triangle
    expect(triangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(triangle.domNode.getAttribute('d')).toBe(TriangleDefinition.matching(triangle).toString());

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      triangle.centerX = value;

      // unchanged
      expect(triangle.centerX).toBeCloseTo(-82.9);
      expect(triangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get centerY()`', () => {
    var triangle = Triangle.create();

    triangle.domNode.dataset.centerY = '18.2';

    expect(triangle.centerY).toBe(18.2);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      triangle.domNode.dataset.centerY = `${value}`;

      expect(triangle.centerY).toBe(0);
    });
  });

  test('`set centerY()`', () => {
    var triangle = Triangle.create();

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    triangle.centerY = 28.77;

    expect(triangle.centerY).toBeCloseTo(28.77);

    // caches value
    expect(Number.parseFloat(triangle.domNode.dataset.centerY)).toBeCloseTo(28.77);

    // repositions triangle
    expect(triangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(triangle.domNode.getAttribute('d')).toBe(TriangleDefinition.matching(triangle).toString());

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      triangle.centerY = value;

      // unchanged
      expect(triangle.centerY).toBeCloseTo(28.77);
      expect(triangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`drag()`', () => {
    var triangle = Triangle.create();

    triangle.centerX = 57;
    triangle.centerY = -12;

    var d = triangle.domNode.getAttribute('d');

    triangle.drag(24, -9);

    expect(triangle.centerX).toBeCloseTo(81);
    expect(triangle.centerY).toBeCloseTo(-21);

    // repositioned triangle
    expect(triangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(triangle.domNode.getAttribute('d')).toBe(TriangleDefinition.matching(triangle).toString());
  });

  test('`get direction()`', () => {
    var triangle = Triangle.create();

    triangle.domNode.dataset.direction = '0.59';

    expect(triangle.direction).toBe(0.59);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      triangle.domNode.dataset.direction = `${value}`;

      expect(triangle.direction).toBe(0);
    });
  });

  test('`set direction()`', () => {
    var triangle = Triangle.create();

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    triangle.direction = -1.28;

    expect(triangle.direction).toBeCloseTo(-1.28);

    // caches value
    expect(Number.parseFloat(triangle.domNode.dataset.direction)).toBeCloseTo(-1.28);

    // repositions triangle
    expect(triangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(triangle.domNode.getAttribute('d')).toBe(TriangleDefinition.matching(triangle).toString());

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      triangle.direction = value;

      // unchanged
      expect(triangle.direction).toBeCloseTo(-1.28);
      expect(triangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get width()`', () => {
    var triangle = Triangle.create();

    triangle.domNode.dataset.width = '8.87';

    expect(triangle.width).toBe(8.87);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      triangle.domNode.dataset.width = `${value}`;

      expect(triangle.width).toBe(0);
    });
  });

  test('`set width()`', () => {
    var triangle = Triangle.create();

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    triangle.width = 20.9;

    expect(triangle.width).toBeCloseTo(20.9);

    // caches value
    expect(Number.parseFloat(triangle.domNode.dataset.width)).toBeCloseTo(20.9);

    // repositions triangle
    expect(triangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(triangle.domNode.getAttribute('d')).toBe(TriangleDefinition.matching(triangle).toString());

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      triangle.width = value;

      // unchanged
      expect(triangle.width).toBeCloseTo(20.9);
      expect(triangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get height()`', () => {
    var triangle = Triangle.create();

    triangle.domNode.dataset.height = '12.5';

    expect(triangle.height).toBe(12.5);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      triangle.domNode.dataset.height = `${value}`;

      expect(triangle.height).toBe(0);
    });
  });

  test('`set height()`', () => {
    var triangle = Triangle.create();

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    triangle.height = 77.2;

    expect(triangle.height).toBeCloseTo(77.2);

    // caches value
    expect(Number.parseFloat(triangle.domNode.dataset.height)).toBeCloseTo(77.2);

    // repositions triangle
    expect(triangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(triangle.domNode.getAttribute('d')).toBe(TriangleDefinition.matching(triangle).toString());

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      triangle.height = value;

      // unchanged
      expect(triangle.height).toBeCloseTo(77.2);
      expect(triangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get tailsHeight()`', () => {
    var triangle = Triangle.create();

    triangle.domNode.dataset.tailsHeight = '3.08';

    expect(triangle.tailsHeight).toBe(3.08);

    // nonfinite values are converted to zero
    ['', 'asdf', NaN, Infinity, -Infinity].forEach(value => {
      triangle.domNode.dataset.tailsHeight = `${value}`;

      expect(triangle.tailsHeight).toBe(0);
    });
  });

  test('`set tailsHeight()`', () => {
    var triangle = Triangle.create();

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    triangle.tailsHeight = 8.21;

    expect(triangle.tailsHeight).toBeCloseTo(8.21);

    // caches value
    expect(Number.parseFloat(triangle.domNode.dataset.tailsHeight)).toBeCloseTo(8.21);

    // repositions triangle
    expect(triangle.domNode.getAttribute('d')).not.toEqual(d);
    expect(triangle.domNode.getAttribute('d')).toBe(TriangleDefinition.matching(triangle).toString());

    var d = triangle.domNode.getAttribute('d');
    expect(d).toBeTruthy();

    // ignores nonfinite values
    [NaN, Infinity, -Infinity].forEach(value => {
      triangle.tailsHeight = value;

      // unchanged
      expect(triangle.tailsHeight).toBeCloseTo(8.21);
      expect(triangle.domNode.getAttribute('d')).toBe(d);
    });
  });

  test('`get bbox()`', () => {
    var triangle = Triangle.create();

    triangle.domNode.getBBox = () => ({ x: -80, y: 120, width: 54, height: 800 });

    expect(triangle.bbox).toBeInstanceOf(Box);

    expect(triangle.bbox.x).toBe(-80);
    expect(triangle.bbox.y).toBe(120);
    expect(triangle.bbox.width).toBe(54);
    expect(triangle.bbox.height).toBe(800);
  });

  test('`serialized()`', () => {
    var triangle = Triangle.create();

    triangle.domNode.id = 'id-251482894';

    var savedTriangle = triangle.serialized();

    expect(savedTriangle.id).toBe('id-251482894');

    // is JSON-serializable
    expect(() => JSON.stringify(savedTriangle)).not.toThrow();

    triangle.domNode.id = '';

    // throws if ID is falsy
    expect(() => triangle.serialized()).toThrow();
  });

  test('`static recreate()`', () => {
    var triangle1 = Triangle.create();

    var parentDrawing = new DrawingMock();

    expect(parentDrawing.domNode.childNodes.length).toBeGreaterThanOrEqual(20);

    // add to drawing
    parentDrawing.domNode.insertBefore(triangle1.domNode, parentDrawing.domNode.childNodes[15]);

    expect(parentDrawing.domNode.childNodes[15]).toBe(triangle1.domNode);

    var savedTriangle = triangle1.serialized();

    // some properties used to be saved as JSON object properties
    savedTriangle.width = 29.4;
    savedTriangle.height = 54.5;

    savedTriangle.tailsHeight = 4.82;

    // direction used to correspond with rotation
    savedTriangle.rotation = 3 * Math.PI / 2;

    var triangle2 = Triangle.recreate(savedTriangle, parentDrawing);

    // found DOM node
    expect(triangle2.domNode).toBe(triangle1.domNode);

    expect(triangle2.domNode).toBeTruthy();
    expect(triangle2).not.toBe(triangle1);

    // reads in legacy properties
    expect(triangle2.width).toBe(29.4);
    expect(triangle2.height).toBe(54.5);

    expect(triangle2.tailsHeight).toBe(4.82);

    // converts rotation to direction (subtracts Math.PI / 2)
    expect(triangle2.direction).toBeCloseTo(Math.PI);
  });
});
