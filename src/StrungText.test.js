/**
 * @jest-environment jsdom
 */

import { StrungText } from './StrungText';

import { Text } from './Text';

import { NucleobaseMock } from './NucleobaseMock';

import { BondMock } from './BondMock';

import { DrawingMock } from './DrawingMock';

beforeAll(() => {
  if (!globalThis.SVGTextElement) {
    globalThis.SVGTextElement = SVGElement;
  }

  if (!SVGTextElement.prototype.getBBox) {
    SVGTextElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 0, height: 0 });
  }

  if (!SVGTextElement.prototype.x) {
    SVGTextElement.prototype.x = { baseVal: [{ value: 0 }] };
  }

  if (!SVGTextElement.prototype.y) {
    SVGTextElement.prototype.y = { baseVal: [{ value: 0 }] };
  }
});

describe('`class StrungText`', () => {
  test('`static on()`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungText = StrungText.on(owner);

    expect(strungText.owner).toBe(owner);
    expect(owner).toBeTruthy();

    expect(strungText.lineX).toBe(0);
    expect(strungText.displacementMagnitude).toBe(0);
  });

  test('`domNode`', () => {
    var text = Text.create('A');

    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungText = new StrungText(text, owner);

    expect(strungText.domNode).toBe(text.domNode);
    expect(strungText.domNode).toBeTruthy();
  });

  test('`owner`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungText = StrungText.on(owner);

    expect(strungText.owner).toBe(owner);
    expect(strungText.owner).toBeTruthy();
  });

  test('`save()`', () => {
    var owner = new BondMock(new NucleobaseMock(), new NucleobaseMock());

    var strungText = StrungText.on(owner);

    expect(strungText.save().text.id).toBeTruthy();

    expect(strungText.save().ownerID).toBe(owner.id);
    expect(strungText.save().ownerID).toBeTruthy();
  });

  test('`recreate()`', () => {
    var parentDrawing = new DrawingMock();

    [...'1234567890'].forEach(n => parentDrawing.addBase(n));

    var bases = parentDrawing.bases;

    [[2, 0], [5, 2], [3, 9], [0, 7], [8, 4], [3, 2], [1, 8]].forEach(([i, j]) => parentDrawing.addBond(bases[i], bases[j]));

    var owner = parentDrawing.bonds[4];

    var strungText1 = StrungText.on(owner);

    parentDrawing.domNode.append(strungText1.domNode);

    var savedStrungText = strungText1.save();

    var strungText2 = StrungText.recreate(savedStrungText, parentDrawing);

    expect(strungText2.domNode).toBe(strungText1.domNode);
    expect(strungText2.domNode).toBeTruthy();

    expect(strungText2.owner).toBe(owner);
    expect(strungText2.owner).toBeTruthy();

    expect(strungText2).not.toBe(strungText1);
  });
});
