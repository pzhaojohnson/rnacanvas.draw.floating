import { Triangle } from './Triangle';

import { StrungElement } from '@rnacanvas/draw.strung';

import type { StrungElementOwner } from './StrungElementOwner';

import type { Drawing } from './Drawing';

import { isNonNullObject } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';

import { isFiniteNumber } from '@rnacanvas/value-check';

export class StrungTriangle extends StrungElement {
  static on(owner: StrungElementOwner): StrungTriangle {
    let triangle = Triangle.create();

    return new StrungTriangle(triangle, owner);
  }

  /**
   * Wrapped triangle element.
   */
  readonly #triangle;

  constructor(triangle: Triangle, override readonly owner: StrungElementOwner) {
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

  static recreate(savedStrungTriangle: unknown, parentDrawing: Drawing): StrungTriangle | never {
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
