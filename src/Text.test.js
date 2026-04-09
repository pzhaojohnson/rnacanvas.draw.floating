/**
 * @jest-environment jsdom
 */

import { Text } from './Text';

import { uuidRegex } from './uuidRegex';

import { Box } from '@rnacanvas/boxes';

import { DrawingMock } from './DrawingMock';

beforeAll(() => {
  if (!globalThis.SVGTextElement) {
    globalThis.SVGTextElement = SVGElement;
  }
});

describe('`class Text`', () => {
  test('`static create()`', () => {
    var text = Text.create('G');

    // SVG IDs must begin with a letter
    expect(text.id.substring(0, 3)).toBe('id-');

    // assigns a UUID
    expect(text.id.substring(3)).toMatch(uuidRegex);

    // no extra (possibly not-allowed) characters
    expect(text.id.length).toBe(3 + 36);

    // creates with specified text content
    expect(text.domNode.textContent).toBe('G');

    // assigns some default values
    expect(text.domNode.getAttribute('font-family')).toBe('Arial');
    expect(text.domNode.getAttribute('font-size')).toBe('9');
    expect(text.domNode.getAttribute('fill')).toBe('black');

    // without any text content
    var text = Text.create();

    expect(text.domNode.textContent).toBe('');
  });

  test('`constructor()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    domNode.setAttribute('id', 'id-76381764');

    var text = new Text(domNode);

    // stores DOM node reference
    expect(text.domNode).toBe(domNode);

    expect(domNode).toBeTruthy();

    // doesn't overwrite ID
    expect(domNode.getAttribute('id')).toBe('id-76381764');
  });

  test('`get id()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    var text = new Text(domNode);

    domNode.setAttribute('id', 'id-897184274');

    expect(text.id).toBe('id-897184274');
  });

  test('`get bbox()`', () => {
    var domNode = {
      getBBox() {
        return { x: 5, y: -10, width: 22, height: 39 };
      }
    };

    var text = new Text(domNode);

    expect(text.bbox).toBeInstanceOf(Box);

    expect(text.bbox.x).toBe(5);
    expect(text.bbox.y).toBe(-10);
    expect(text.bbox.width).toBe(22);
    expect(text.bbox.height).toBe(39);
  });

  test('`get centerX()`', () => {
    var domNode = {
      getBBox() {
        return { x: 5, y: -10, width: 22, height: 39 };
      }
    };

    var text = new Text(domNode);

    expect(text.centerX).toBeCloseTo(16);
  });

  test('`set centerX()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    domNode.x = { baseVal: [{ value: 57 }] };

    domNode.getBBox = () => ({ x: 53, y: -12, width: 24, height: 50 });

    var text = new Text(domNode);

    expect(text.centerX).toBeCloseTo(65);

    text.centerX = 27;

    expect(Number.parseFloat(domNode.getAttribute('x'))).toBeCloseTo(19);
  });

  test('`get centerY()`', () => {
    var domNode = {
      getBBox() {
        return { x: 5, y: -10, width: 22, height: 39 };
      }
    };

    var text = new Text(domNode);

    expect(text.centerY).toBeCloseTo(9.5);
  });

  test('`set centerY()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    domNode.y = { baseVal: [{ value: 6.5 }] };

    domNode.getBBox = () => ({ x: 2, y: 5, width: 31, height: 45 });

    var text = new Text(domNode);

    expect(text.centerY).toBeCloseTo(27.5);

    text.centerY = 89;

    expect(Number.parseFloat(domNode.getAttribute('y'))).toBeCloseTo(68);
  });

  test('`drag()`', () => {
    var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    domNode.x = { baseVal: [{ value: -2 }] };
    domNode.y = { baseVal: [{ value: 8 }] };

    domNode.getBBox = () => ({ x: -3, y: 5, width: 32, height: 55 });

    var text = new Text(domNode);

    expect(text.centerX).toBeCloseTo(13);
    expect(text.centerY).toBeCloseTo(32.5);

    text.drag(12, -9);

    expect(Number.parseFloat(domNode.getAttribute('x'))).toBeCloseTo(10);
    expect(Number.parseFloat(domNode.getAttribute('y'))).toBeCloseTo(-1);
  });

  test('`serialized()`', () => {
    var text = Text.create();

    text.domNode.setAttribute('id', 'id-7681674284');

    var savedText = text.serialized();

    // saves ID
    expect(savedText.id).toBe('id-7681674284');

    text.domNode.setAttribute('id', '');

    // throws for falsy IDs
    expect(() => text.serialized()).toThrow();
  });

  test('`static recreate()`', () => {
    var text1 = Text.create('A');

    var parentDrawing = new DrawingMock();

    expect(parentDrawing.domNode.childNodes.length).toBeGreaterThanOrEqual(20);

    parentDrawing.domNode.insertBefore(text1.domNode, parentDrawing.domNode.childNodes[7]);

    expect(parentDrawing.domNode.childNodes[7]).toBe(text1.domNode);

    var savedText = text1.serialized();

    var text2 = Text.recreate(savedText, parentDrawing);

    // finds DOM node
    expect(text2.domNode).toBe(text1.domNode);

    expect(text1.domNode).toBeTruthy();
  });
});
