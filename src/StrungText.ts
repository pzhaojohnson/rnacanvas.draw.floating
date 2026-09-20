import { Text } from './Text';

import { StrungElement } from '@rnacanvas/draw.strung';

import type { StrungElementOwner } from './StrungElementOwner';

import type { Drawing } from './Drawing';

import { isNonNullObject } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';

export class StrungText<T extends Text, O extends StrungElementOwner> extends StrungElement<T, O> {
  static on<O extends StrungElementOwner>(owner: O) {
    let text = Text.create();

    // text elements without text content cannot be positioned properly
    text.domNode.textContent = 'Text';

    // default font size for strung text elements
    text.domNode.setAttribute('font-size', '7');

    let strungText = new StrungText(text, owner);

    // position the strung text element
    strungText.lineX = 0;
    strungText.displacementMagnitude = 0;

    return strungText;
  }

  /**
   * Wrapped text element.
   */
  readonly #text;

  constructor(text: T, owner: O) {
    super(text, owner);

    this.#text = text;
  }

  get textContent(): string {
    return this.domNode.textContent;
  }

  save() {
    return {
      text: this.#text.serialized(),

      ownerID: this.owner.id,
    };
  }

  static recreate<O extends StrungElementOwner>(savedStrungText: unknown, parentDrawing: Drawing<O>) {
    if (!isNonNullObject(savedStrungText)) {
      throw new Error(`Saved strung text isn't an object: ${savedStrungText}.`);
    }

    let text = Text.recreate(savedStrungText.text, parentDrawing);

    if (!isString(savedStrungText.ownerID)) {
      throw new Error(`Saved strung text owner ID isn't a string: ${savedStrungText.ownerID}.`);
    } else if (!savedStrungText.ownerID) {
      throw new Error('Saved strung text owner ID is an empty string.');
    }

    let owner = parentDrawing.bonds.find(bond => bond.id == savedStrungText.ownerID);

    if (!owner) {
      throw new Error(`Saved strung text owner wasn't found in the parent drawing: ${savedStrungText}.`);
    }

    return new StrungText(text, owner);
  }
}
