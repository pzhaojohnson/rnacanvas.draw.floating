/**
 * @jest-environment jsdom
 */

import { Circle } from './Circle';

import { DrawingMock } from './DrawingMock';

beforeAll(() => {
  if (!globalThis.SVGCircleElement) {
    globalThis.SVGCircleElement = SVGElement;
  }
});

describe('`class Circle`', () => {
  test('`static create()`', () => {
    var circle = Circle.create();

    // SVG IDs must start with a letter
    expect(circle.id.substring(0, 3)).toBe('id-');

    // assigns a UUID
    expect(circle.id.substring(3)).toMatch(uuidRegex);

    // no extra (possibly not-allowed) characters
    expect(circle.id.length).toBe(3 + 36);

    // assigns some default values
    expect(circle.domNode.getAttribute('r')).not.toBe(null);
    expect(circle.domNode.getAttribute('stroke')).not.toBe(null);
    expect(circle.domNode.getAttribute('stroke-width')).not.toBe(null);
    expect(circle.domNode.getAttribute('fill')).not.toBe(null);
  });

  test('`constructor()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    domNode.setAttribute('id', 'id-83741924');

    var circle = new Circle(domNode);

    // stores DOM node reference
    expect(circle.domNode).toBe(domNode);

    // doesn't overwrite ID
    expect(domNode.id).toBe('id-83741924');
  });

  test('`get id()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    domNode.setAttribute('id', 'id-241727941');

    var circle = new Circle(domNode);

    expect(circle.id).toBe('id-241727941');
  });

  test('`get centerX()`', () => {
    var domNode = { cx: { baseVal: { value: 12.221 } } };

    var circle = new Circle(domNode);

    expect(circle.centerX).toBe(12.221);
  });

  test('`set centerX()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    var circle = new Circle(domNode);

    circle.centerX = 57.2;

    // sets underlying DOM node attribute
    expect(domNode.getAttribute('cx')).toBe('57.2');
  });

  test('`get centerY()`', () => {
    var domNode = { cy: { baseVal: { value: -18.25 } } };

    var circle = new Circle(domNode);

    expect(circle.centerY).toBe(-18.25);
  });

  test('`set centerY()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    var circle = new Circle(domNode);

    circle.centerY = 0.0028;

    // sets underlying DOM node attribute
    expect(domNode.getAttribute('cy')).toBe('0.0028');
  });

  test('`drag()`', () => {
    var circle = Circle.create();

    circle.domNode.cx = { baseVal: { value: 52 } };
    circle.domNode.cy = { baseVal: { value: 108 } };

    circle.drag(20, -18);

    expect(Number.parseFloat(circle.domNode.getAttribute('cx'))).toBeCloseTo(72);
    expect(Number.parseFloat(circle.domNode.getAttribute('cy'))).toBeCloseTo(90);
  });

  test('`serialized()`', () => {
    var circle = Circle.create();

    expect(circle.serialized().id).toBe(circle.id);

    expect(circle.id).toBeTruthy();

    circle.domNode.setAttribute('id', '');

    // throws if ID is falsy
    expect(() => circle.serialized()).toThrow();
  });

  test('`static recreate()`', () => {
    var circle1 = Circle.create();

    var parentDrawing = new DrawingMock();

    expect(parentDrawing.domNode.childNodes.length).toBeGreaterThanOrEqual(20);

    parentDrawing.domNode.insertBefore(circle1.domNode, parentDrawing.domNode.childNodes[11]);

    expect(parentDrawing.domNode.childNodes[11]).toBe(circle1.domNode);

    var savedCircle = circle1.serialized();

    var circle2 = Circle.recreate(savedCircle, parentDrawing);

    // finds DOM node
    expect(circle2.domNode).toBe(circle1.domNode);

    expect(circle1.domNode).toBeTruthy();
  });
});

const uuidRegex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
