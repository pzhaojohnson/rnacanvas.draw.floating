/**
 * @jest-environment jsdom
 */

import { StrungRectangle } from './StrungRectangle';

import { Rectangle } from './Rectangle';

import { NucleobaseMock } from './NucleobaseMock';

import { BondMock } from './BondMock';

import { DrawingMock } from './DrawingMock';

beforeAll(() => {
  if (!globalThis.SVGPathElement) {
    globalThis.SVGPathElement = SVGElement;
  }

  if (!SVGPathElement.prototype.getBBox) {
    SVGPathElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 0, height: 0 });
  }
});

describe('`class StrungRectangle`', () => {
  test('`static on()`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungRectangle = StrungRectangle.on(owner);

    expect(strungRectangle.owner).toBe(owner);
    expect(owner).toBeTruthy();
  });

  test('`domNode`', () => {
    var rectangle = Rectangle.create();

    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungRectangle = new StrungRectangle(rectangle, owner);

    expect(strungRectangle.domNode).toBe(rectangle.domNode);
    expect(strungRectangle.domNode).toBeTruthy();
  });

  test('`owner`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungRectangle = StrungRectangle.on(owner);

    expect(strungRectangle.owner).toBe(owner);
    expect(strungRectangle.owner).toBeTruthy();
  });

  test('`save()`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungRectangle = StrungRectangle.on(owner);

    expect(strungRectangle.save().rectangle.id).toBeTruthy();

    expect(strungRectangle.save().ownerID).toBe(owner.id);
    expect(strungRectangle.save().ownerID).toBeTruthy();
  });

  test('`width`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungRectangle = StrungRectangle.on(owner);

    expect(strungRectangle.width).not.toBeCloseTo(12.4);

    strungRectangle.width = 12.4;

    expect(strungRectangle.width).toBeCloseTo(12.4);

    // check that rectangle center coordinates are automatically maintained (by being defining parameters)
    expect(strungRectangle.domNode.dataset.centerX).toBeTruthy();
    expect(strungRectangle.domNode.dataset.centerY).toBeTruthy();
  });

  test('`height`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungRectangle = StrungRectangle.on(owner);

    expect(strungRectangle.height).not.toBeCloseTo(18.7);

    strungRectangle.height = 18.7;

    expect(strungRectangle.height).toBeCloseTo(18.7);

    // check that rectangle center coordinates are automatically maintained (by being defining parameters)
    expect(strungRectangle.domNode.dataset.centerX).toBeTruthy();
    expect(strungRectangle.domNode.dataset.centerY).toBeTruthy();
  });

  test('`cornerRadius`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungRectangle = StrungRectangle.on(owner);

    expect(strungRectangle.cornerRadius).not.toBeCloseTo(8.21);

    strungRectangle.cornerRadius = 8.21;

    expect(strungRectangle.cornerRadius).toBeCloseTo(8.21);
  });

  test('`recreate()`', () => {
    var parentDrawing = new DrawingMock();

    [...'1234567890'].forEach(n => parentDrawing.addBase(n));

    var bases = parentDrawing.bases;

    [[2, 0], [5, 2], [3, 9], [0, 7], [8, 4], [3, 2], [1, 8]].forEach(([i, j]) => parentDrawing.addBond(bases[i], bases[j]));

    var owner = parentDrawing.bonds[4];

    var strungRectangle1 = StrungRectangle.on(owner);

    parentDrawing.domNode.append(strungRectangle1.domNode);

    var savedStrungRectangle = strungRectangle1.save();

    var strungRectangle2 = StrungRectangle.recreate(savedStrungRectangle, parentDrawing);

    expect(strungRectangle2.domNode).toBe(strungRectangle1.domNode);
    expect(strungRectangle2.domNode).toBeTruthy();

    expect(strungRectangle2.owner).toBe(owner);
    expect(strungRectangle2.owner).toBeTruthy();

    expect(strungRectangle2).not.toBe(strungRectangle1);
  });
});
