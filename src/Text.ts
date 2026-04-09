import { Box } from '@rnacanvas/boxes';

import { CenterPoint } from '@rnacanvas/draw.svg.text';

import type { Drawing } from './Drawing';

import { isNonNullObject } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';

/**
 * A text element.
 */
export class Text {
  static create(textContent?: string): Text {
    let domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    // SVG IDs must begin with a letter
    domNode.id = 'id-' + self.crypto.randomUUID();

    domNode.textContent = textContent ?? '';

    domNode.setAttribute('font-family', 'Arial');
    domNode.setAttribute('font-size', '9');
    domNode.setAttribute('font-weight', '700');
    domNode.setAttribute('font-style', 'normal');

    domNode.setAttribute('fill', 'black');
    domNode.setAttribute('fill-opacity', '1');

    return new Text(domNode);
  }

  constructor(readonly domNode: SVGTextElement) {}

  get id(): string {
    return this.domNode.id;
  }

  get bbox(): Box {
    return Box.matching(this.domNode.getBBox());
  }

  get centerX(): number {
    return this.bbox.centerX;
  }

  set centerX(centerX) {
    let centerPoint = new CenterPoint(this.domNode);

    centerPoint.x = centerX;
  }

  get centerY(): number {
    return this.bbox.centerY;
  }

  set centerY(centerY) {
    let centerPoint = new CenterPoint(this.domNode);

    centerPoint.y = centerY;
  }

  drag(x: number, y: number): void {
    this.centerX += x;
    this.centerY += y;
  }

  serialized() {
    if (!this.id) {
      throw new Error('Text element ID is falsy.');
    }

    return {
      id: this.id,
    };
  }

  /**
   * Recreates a saved text element given the parent drawing that its DOM node is in.
   */
  static recreate(savedText: unknown, parentDrawing: Drawing): Text | never {
    if (!isNonNullObject(savedText)) {
      throw new Error(`Saved text element is not an object: ${savedText}.`);
    }

    if (!savedText.id) {
      throw new Error('Saved text element ID is falsy.');
    } else if (!isString(savedText.id)) {
      throw new Error(`Saved text element ID is not a string: ${savedText.id}.`)
    }

    let domNode = parentDrawing.domNode.querySelector('#' + savedText.id);

    if (!domNode) {
      throw new Error('Unable to find text element DOM node in parent drawing by ID.');
    } else if (!(domNode instanceof SVGTextElement)) {
      throw new Error(`Text element DOM node is not an SVG text element: ${domNode}.`);
    }

    return new Text(domNode);
  }
}
