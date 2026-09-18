/**
 * @jest-environment jsdom
 */

import { StrungCircle } from './StrungCircle';

import { Circle } from './Circle';

import { NucleobaseMock } from './NucleobaseMock';

import { BondMock } from './BondMock';

import { DrawingMock } from './DrawingMock';

beforeAll(() => {
  if (!globalThis.SVGCircleElement) {
    globalThis.SVGCircleElement = SVGElement;
  }

  if (!SVGCircleElement.prototype.cx) {
    SVGCircleElement.prototype.cx = { baseVal: { value: 0 } };
  }

  if (!SVGCircleElement.prototype.cy) {
    SVGCircleElement.prototype.cy = { baseVal: { value: 0 } };
  }
});

describe('`class StrungCircle`', () => {
  test('`static on()`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungCircle = StrungCircle.on(owner);

    expect(strungCircle.owner).toBe(owner);
    expect(owner).toBeTruthy();

    expect(strungCircle.lineX).toBe(0);
    expect(strungCircle.displacementMagnitude).toBe(0);
  });

  test('`domNode`', () => {
    var circle = Circle.create();

    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungCircle = new StrungCircle(circle, owner);

    expect(strungCircle.domNode).toBe(circle.domNode);
    expect(strungCircle.domNode).toBeTruthy();
  });

  test('`owner`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungCircle = StrungCircle.on(owner);

    expect(strungCircle.owner).toBe(owner);
    expect(strungCircle.owner).toBeTruthy();
  });

  test('`save()`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungCircle = StrungCircle.on(owner);

    expect(strungCircle.save().circle.id).toBeTruthy();

    expect(strungCircle.save().ownerID).toBe(owner.id);
    expect(strungCircle.save().ownerID).toBeTruthy();
  });

  test('`recreate()`', () => {
    var parentDrawing = new DrawingMock();

    // add some extra elements to find around
    [...'1234567890'].forEach(n => parentDrawing.addBase(n));

    var bases = parentDrawing.bases;

    [[2, 0], [5, 2], [3, 9], [0, 7], [8, 4], [3, 2], [1, 8]].forEach(([i, j]) => parentDrawing.addBond(bases[i], bases[j]));

    var owner = parentDrawing.bonds[4];

    var strungCircle1 = StrungCircle.on(owner);

    parentDrawing.domNode.append(strungCircle1.domNode);

    var savedStrungCircle = strungCircle1.save();

    var strungCircle2 = StrungCircle.recreate(savedStrungCircle, parentDrawing);

    expect(strungCircle2.domNode).toBe(strungCircle1.domNode);
    expect(strungCircle2.domNode).toBeTruthy();

    expect(strungCircle2.owner).toBe(owner);
    expect(strungCircle2.owner).toBeTruthy();

    expect(strungCircle2).not.toBe(strungCircle1);
  });
});
