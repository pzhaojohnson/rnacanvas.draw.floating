import { Triangle } from './Triangle';

import { StrungElement } from '@rnacanvas/draw.strung';

import type { StrungElementOwner } from './StrungElementOwner';

import type { Drawing } from './Drawing';

import { isNonNullObject } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';

import { isFiniteNumber } from '@rnacanvas/value-check';

export class StrungTriangle<T extends Triangle, O extends StrungElementOwner> extends StrungElement<T, O> {
  static on<O extends StrungElementOwner>(owner: O) {
    let triangle = Triangle.create();

    let strungTriangle = new StrungTriangle(triangle, owner);

    // position the strung triangle element
    strungTriangle.lineX = 0;
    strungTriangle.displacementMagnitude = 0;

    return strungTriangle;
  }

  /**
   * Wrapped triangle element.
   */
  readonly #triangle;

  constructor(triangle: T, owner: O) {
    super(triangle, owner);

    this.#triangle = triangle;
  }

  get width() {
    return this.#triangle.width;
  }

  set width(width) {
    this.#triangle.width = width;
  }

  get height() {
    return this.#triangle.height;
  }

  set height(height) {
    this.#triangle.height = height;
  }

  get tailsHeight() {
    return this.#triangle.tailsHeight;
  }

  set tailsHeight(tailsHeight) {
    this.#triangle.tailsHeight = tailsHeight;
  }

  save() {
    return {
      triangle: this.#triangle.serialized(),

      ownerID: this.owner.id,
    };
  }

  static recreate(savedStrungTriangle: unknown, parentDrawing: Drawing) {
    if (!isNonNullObject(savedStrungTriangle)) {
      throw new Error(`Saved strung triangle isn't an object: ${savedStrungTriangle}.`);
    }

    let triangle = Triangle.recreate(savedStrungTriangle.triangle, parentDrawing);

    if (!isString(savedStrungTriangle.ownerID)) {
      throw new Error(`Saved strung triangle owner ID isn't a string: ${savedStrungTriangle.ownerID}.`);
    } else if (!savedStrungTriangle.ownerID) {
      throw new Error('Saved strung triangle owner ID is an empty string.');
    }

    let owner = parentDrawing.bonds.find(bond => bond.id === savedStrungTriangle.ownerID);

    if (!owner) {
      throw new Error(`Saved strung triangle owner wasn't found in the parent drawing: ${savedStrungTriangle}.`);
    }

    // rotation used to be saved as an object property
    if (isFiniteNumber(savedStrungTriangle.rotation)) {
      triangle.domNode.dataset.rotation = `${savedStrungTriangle.rotation}`;
    }

    return new StrungTriangle(triangle, owner);
  }
}
