import { Circle } from './Circle';

import { StrungElement } from '@rnacanvas/draw.strung';

import type { StrungElementOwner } from './StrungElementOwner';

import type { Drawing } from './Drawing';

import { isNonNullObject } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';

export class StrungCircle extends StrungElement {
  static on(owner: StrungElementOwner) {
    let circle = Circle.create();

    // default radius for strung circles
    circle.domNode.setAttribute('r', '3');

    let strungCircle = new StrungCircle(circle, owner);

    // position the strung circle element
    strungCircle.lineX = 0;
    strungCircle.displacementMagnitude = 0;

    return strungCircle;
  }

  /**
   * Wrapped circle element.
   */
  readonly #circle;

  constructor(circle: Circle, override readonly owner: StrungElementOwner) {
    super(circle, owner);

    this.#circle = circle;
  }

  save() {
    return {
      circle: this.#circle.serialized(),

      ownerID: this.owner.id,
    };
  }

  static recreate(savedStrungCircle: unknown, parentDrawing: Drawing): StrungCircle | never {
    if (!isNonNullObject(savedStrungCircle)) {
      throw new Error(`Saved strung circle isn't an object: ${savedStrungCircle}.`);
    }

    let circle = Circle.recreate(savedStrungCircle.circle, parentDrawing);

    if (!isString(savedStrungCircle.ownerID)) {
      throw new Error(`Saved strung circle owner ID isn't a string: ${savedStrungCircle.ownerID}.`);
    } else if (!savedStrungCircle.ownerID) {
      throw new Error('Saved strung circle owner ID is an empty string.');
    }

    let owner = parentDrawing.bonds.find(bond => bond.id === savedStrungCircle.ownerID);

    if (!owner) {
      throw new Error(`Saved strung circle owner wasn't found in the parent drawing: ${savedStrungCircle}.`);
    }

    return new StrungCircle(circle, owner);
  }
}
