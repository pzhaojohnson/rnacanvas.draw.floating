/**
 * @jest-environment jsdom
 */

import { StrungElement } from './StrungElement';

import { StrungText } from './StrungText';

import { StrungCircle } from './StrungCircle';

import { StrungRectangle } from './StrungRectangle';

import { StrungTriangle } from './StrungTriangle';

import { DrawingMock } from './DrawingMock';

import { NucleobaseMock } from './NucleobaseMock';

import { BondMock } from './BondMock';

beforeAll(() => {
  class MockTextElement extends SVGElement {}

  class MockCircleElement extends SVGElement {}

  class MockPathElement extends SVGElement {}

  globalThis.SVGTextElement = MockTextElement;
  globalThis.SVGCircleElement = MockCircleElement;
  globalThis.SVGPathElement = MockPathElement;

  const originalCreateElementNS = document.createElementNS.bind(document);

  document.createElementNS = (namespaceURI, qualifiedName) => {
    let domNode = originalCreateElementNS(namespaceURI, qualifiedName);

    if (qualifiedName === 'text') {
      Object.setPrototypeOf(domNode, MockTextElement.prototype);
    } else if (qualifiedName === 'circle') {
      Object.setPrototypeOf(domNode, MockCircleElement.prototype);
    } else if (qualifiedName === 'path') {
      Object.setPrototypeOf(domNode, MockPathElement.prototype);
    }

    return domNode;
  };

  if (!SVGTextElement.prototype.getBBox) {
    SVGTextElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 0, height: 0 });
  }

  if (!SVGTextElement.prototype.x) {
    SVGTextElement.prototype.x = { baseVal: [{ value: 0 }] };
  }

  if (!SVGTextElement.prototype.y) {
    SVGTextElement.prototype.y = { baseVal: [{ value: 0 }] };
  }

  if (!SVGCircleElement.prototype.cx) {
    SVGCircleElement.prototype.cx = { baseVal: { value: 0 } };
  }

  if (!SVGCircleElement.prototype.cy) {
    SVGCircleElement.prototype.cy = { baseVal: { value: 0 } };
  }

  if (!SVGPathElement.prototype.getBBox) {
    SVGPathElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 0, height: 0 });
  }
});

describe('`class StrungElement`', () => {
  test('`recreate()`', () => {
    var parentDrawing1 = new DrawingMock();

    [...'1234567890'].forEach(n => parentDrawing1.addBase(n));

    var bases1 = parentDrawing1.bases;

    [[2, 0], [5, 2], [3, 9], [0, 7], [8, 4], [3, 2], [1, 8]].forEach(([i, j]) => parentDrawing1.addBond(bases1[i], bases1[j]));

    var owner1 = parentDrawing1.bonds[4];

    var strungText1 = StrungText.on(owner1);

    parentDrawing1.domNode.append(strungText1.domNode);

    var savedStrungText = strungText1.save();

    var strungText2 = StrungElement.recreate(savedStrungText, parentDrawing1);

    expect(strungText2).toBeInstanceOf(StrungText);
    expect(strungText2.domNode).toBe(strungText1.domNode);
    expect(strungText2.domNode).toBeTruthy();

    expect(strungText2.owner).toBe(owner1);
    expect(strungText2.owner).toBeTruthy();

    expect(strungText2).not.toBe(strungText1);

    var parentDrawing2 = new DrawingMock();

    [...'1234567890'].forEach(n => parentDrawing2.addBase(n));

    var bases2 = parentDrawing2.bases;

    [[2, 0], [5, 2], [3, 9], [0, 7], [8, 4], [3, 2], [1, 8]].forEach(([i, j]) => parentDrawing2.addBond(bases2[i], bases2[j]));

    var owner2 = parentDrawing2.bonds[4];

    var strungCircle1 = StrungCircle.on(owner2);

    parentDrawing2.domNode.append(strungCircle1.domNode);

    var savedStrungCircle = strungCircle1.save();

    var strungCircle2 = StrungElement.recreate(savedStrungCircle, parentDrawing2);

    expect(strungCircle2).toBeInstanceOf(StrungCircle);
    expect(strungCircle2.domNode).toBe(strungCircle1.domNode);
    expect(strungCircle2.domNode).toBeTruthy();

    expect(strungCircle2.owner).toBe(owner2);
    expect(strungCircle2.owner).toBeTruthy();

    expect(strungCircle2).not.toBe(strungCircle1);

    var parentDrawing3 = new DrawingMock();

    [...'1234567890'].forEach(n => parentDrawing3.addBase(n));

    var bases3 = parentDrawing3.bases;

    [[2, 0], [5, 2], [3, 9], [0, 7], [8, 4], [3, 2], [1, 8]].forEach(([i, j]) => parentDrawing3.addBond(bases3[i], bases3[j]));

    var owner3 = parentDrawing3.bonds[4];

    var strungRectangle1 = StrungRectangle.on(owner3);

    parentDrawing3.domNode.append(strungRectangle1.domNode);

    var savedStrungRectangle = strungRectangle1.save();

    var strungRectangle2 = StrungElement.recreate(savedStrungRectangle, parentDrawing3);

    expect(strungRectangle2).toBeInstanceOf(StrungRectangle);
    expect(strungRectangle2.domNode).toBe(strungRectangle1.domNode);
    expect(strungRectangle2.domNode).toBeTruthy();

    expect(strungRectangle2.owner).toBe(owner3);
    expect(strungRectangle2.owner).toBeTruthy();

    expect(strungRectangle2).not.toBe(strungRectangle1);

    var parentDrawing4 = new DrawingMock();

    [...'1234567890'].forEach(n => parentDrawing4.addBase(n));

    var bases4 = parentDrawing4.bases;

    [[2, 0], [5, 2], [3, 9], [0, 7], [8, 4], [3, 2], [1, 8]].forEach(([i, j]) => parentDrawing4.addBond(bases4[i], bases4[j]));

    var owner4 = parentDrawing4.bonds[4];

    var strungTriangle1 = StrungTriangle.on(owner4);

    parentDrawing4.domNode.append(strungTriangle1.domNode);

    var savedStrungTriangle = strungTriangle1.save();

    var strungTriangle2 = StrungElement.recreate(savedStrungTriangle, parentDrawing4);

    expect(strungTriangle2).toBeInstanceOf(StrungTriangle);
    expect(strungTriangle2.domNode).toBe(strungTriangle1.domNode);
    expect(strungTriangle2.domNode).toBeTruthy();

    expect(strungTriangle2.owner).toBe(owner4);
    expect(strungTriangle2.owner).toBeTruthy();

    expect(strungTriangle2).not.toBe(strungTriangle1);
  });
});
