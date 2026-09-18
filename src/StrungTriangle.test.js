/**
 * @jest-environment jsdom
 */

import { StrungTriangle } from './StrungTriangle';

import { Triangle } from './Triangle';

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

describe('`class StrungTriangle`', () => {
  test('`static on()`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungTriangle = StrungTriangle.on(owner);

    expect(strungTriangle.owner).toBe(owner);
    expect(owner).toBeTruthy();

    expect(strungTriangle.lineX).toBe(0);
    expect(strungTriangle.displacementMagnitude).toBe(0);
  });

  test('`domNode`', () => {
    var triangle = Triangle.create();

    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungTriangle = new StrungTriangle(triangle, owner);

    expect(strungTriangle.domNode).toBe(triangle.domNode);
    expect(strungTriangle.domNode).toBeTruthy();
  });

  test('`owner`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungTriangle = StrungTriangle.on(owner);

    expect(strungTriangle.owner).toBe(owner);
    expect(strungTriangle.owner).toBeTruthy();
  });

  test('`save()`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungTriangle = StrungTriangle.on(owner);

    expect(strungTriangle.save().triangle.id).toBeTruthy();

    expect(strungTriangle.save().ownerID).toBe(owner.id);
    expect(strungTriangle.save().ownerID).toBeTruthy();
  });

  test('`width`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungTriangle = StrungTriangle.on(owner);

    expect(strungTriangle.width).not.toBeCloseTo(12.4);

    strungTriangle.width = 12.4;

    expect(strungTriangle.width).toBeCloseTo(12.4);

    // center coordinates are automatically maintained (being defining positional properties)
    expect(strungTriangle.domNode.dataset.centerX).toBeTruthy();
    expect(strungTriangle.domNode.dataset.centerY).toBeTruthy();
  });

  test('`height`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungTriangle = StrungTriangle.on(owner);

    expect(strungTriangle.height).not.toBeCloseTo(18.7);

    strungTriangle.height = 18.7;

    expect(strungTriangle.height).toBeCloseTo(18.7);

    // center coordinates are automatically maintained (being defining positional properties)
    expect(strungTriangle.domNode.dataset.centerX).toBeTruthy();
    expect(strungTriangle.domNode.dataset.centerY).toBeTruthy();
  });

  test('`tailsHeight`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungTriangle = StrungTriangle.on(owner);

    expect(strungTriangle.tailsHeight).not.toBeCloseTo(7.5);

    strungTriangle.tailsHeight = 7.5;

    expect(strungTriangle.tailsHeight).toBeCloseTo(7.5);
  });

  test('`recreate()`', () => {
    var parentDrawing = new DrawingMock();

    [...'1234567890'].forEach(n => parentDrawing.addBase(n));

    var bases = parentDrawing.bases;

    [[2, 0], [5, 2], [3, 9], [0, 7], [8, 4], [3, 2], [1, 8]].forEach(([i, j]) => parentDrawing.addBond(bases[i], bases[j]));

    var owner = parentDrawing.bonds[4];

    var strungTriangle1 = StrungTriangle.on(owner);

    parentDrawing.domNode.append(strungTriangle1.domNode);

    var savedStrungTriangle = strungTriangle1.save();

    var strungTriangle2 = StrungTriangle.recreate(savedStrungTriangle, parentDrawing);

    expect(strungTriangle2.domNode).toBe(strungTriangle1.domNode);
    expect(strungTriangle2.domNode).toBeTruthy();

    expect(strungTriangle2.owner).toBe(owner);
    expect(strungTriangle2.owner).toBeTruthy();

    expect(strungTriangle2).not.toBe(strungTriangle1);

    // rotation used to be saved as an object property
    savedStrungTriangle.rotation = Math.PI / 4.5;

    var strungTriangle3 = StrungTriangle.recreate(savedStrungTriangle, parentDrawing);

    // handles legacy rotation property
    expect(strungTriangle3.domNode.dataset.rotation).toBe(`${Math.PI / 4.5}`);
  });
});
