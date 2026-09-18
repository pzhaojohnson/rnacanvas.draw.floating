import { Rectangle } from './Rectangle';

import { StrungElement } from '@rnacanvas/draw.strung';

import type { StrungElementOwner } from './StrungElementOwner';

import type { Drawing } from './Drawing';

import { isNonNullObject } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';

import { isFiniteNumber } from '@rnacanvas/value-check';

export class StrungRectangle extends StrungElement {
  static on(owner: StrungElementOwner): StrungRectangle {
    let rectangle = Rectangle.create();

    let strungRectangle = new StrungRectangle(rectangle, owner);

    // position the strung rectangle element
    strungRectangle.lineX = 0;
    strungRectangle.displacementMagnitude = 0;

    return strungRectangle;
  }

  /**
   * Wrapped rectangle element.
   */
  readonly #rectangle;

  constructor(rectangle: Rectangle, override readonly owner: StrungElementOwner) {
    super(rectangle, owner);

    this.#rectangle = rectangle;
  }

  get width() {
    return this.#rectangle.width;
  }

  set width(width) {
    this.#rectangle.width = width;
  }

  get height() {
    return this.#rectangle.height;
  }

  set height(height) {
    this.#rectangle.height = height;
  }

  get cornerRadius() {
    return this.#rectangle.cornerRadius;
  }

  set cornerRadius(cornerRadius) {
    this.#rectangle.cornerRadius = cornerRadius;
  }

  save() {
    return {
      rectangle: this.#rectangle.serialized(),

      ownerID: this.owner.id,
    };
  }

  static recreate(savedStrungRectangle: unknown, parentDrawing: Drawing): StrungRectangle | never {
    if (!isNonNullObject(savedStrungRectangle)) {
      throw new Error(`Saved strung rectangle isn't an object: ${savedStrungRectangle}.`);
    }

    let rectangle = Rectangle.recreate(savedStrungRectangle.rectangle, parentDrawing);

    if (!isString(savedStrungRectangle.ownerID)) {
      throw new Error(`Saved strung rectangle owner ID isn't a string: ${savedStrungRectangle.ownerID}.`);
    } else if (!savedStrungRectangle.ownerID) {
      throw new Error('Saved strung rectangle owner ID is an empty string.');
    }

    let owner = parentDrawing.bonds.find(bond => bond.id === savedStrungRectangle.ownerID);

    if (!owner) {
      throw new Error(`Saved strung rectangle owner wasn't found in the parent drawing: ${savedStrungRectangle}.`);
    }

    // rotation used to be saved as an object property
    if (isFiniteNumber(savedStrungRectangle.rotation)) {
      rectangle.domNode.dataset.rotation = `${savedStrungRectangle.rotation}`;
    }

    return new StrungRectangle(rectangle, owner);
  }
}

