import type { Drawing } from './Drawing';

import { isNonNullObject } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';

export class Circle {
  /**
   * Creates a circle element with a UUID and other default values.
   */
  static create() {
    let domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    domNode.id = 'id-' + self.crypto.randomUUID();

    domNode.setAttribute('r', '6');

    domNode.setAttribute('stroke', 'black');
    domNode.setAttribute('stroke-width', '1');
    domNode.setAttribute('stroke-opacity', '1');
    domNode.setAttribute('stroke-dasharray', '');
    domNode.setAttribute('stroke-linecap', '');

    domNode.setAttribute('fill', 'white');
    domNode.setAttribute('fill-opacity', '1');

    return new Circle(domNode);
  }

  constructor(readonly domNode: SVGCircleElement) {}

  get id(): string {
    return this.domNode.id;
  }

  /**
   * Center X coordinate.
   */
  get centerX(): number {
    return this.domNode.cx.baseVal.value;
  }

  set centerX(centerX) {
    this.domNode.setAttribute('cx', `${centerX}`);
  }

  /**
   * Center Y coordinate.
   */
  get centerY(): number {
    return this.domNode.cy.baseVal.value;
  }

  set centerY(centerY) {
    this.domNode.setAttribute('cy', `${centerY}`);
  }

  drag(x: number, y: number): void {
    this.centerX += x;
    this.centerY += y;
  }

  /**
   * Circles don't have a direction (always evaluates to zero).
   */
  get direction(): number {
    return 0;
  }

  set direction(direction) {
    // nothing to do
  }

  serialized() {
    if (!this.id) {
      throw new Error('Circle ID is falsy.');
    }

    return {
      id: this.id,
    };
  }

  /**
   * Recreates a saved circle given the parent drawing that its DOM node is in.
   */
  static recreate(savedCircle: unknown, parentDrawing: Drawing): Circle | never {
    if (!isNonNullObject(savedCircle)) {
      throw new Error(`Saved circle must be an object: ${savedCircle}.`);
    }

    if (!savedCircle.id) {
      throw new Error('Saved circle ID is falsy.');
    } else if (!isString(savedCircle.id)) {
      throw new Error(`Saved circle ID must be a string: ${savedCircle.id}.`);
    }

    let domNode = parentDrawing.domNode.querySelector('#' + savedCircle.id);

    if (!domNode) {
      throw new Error('Unable to find circle element DOM node by ID.');
    } else if (!(domNode instanceof SVGCircleElement)) {
      throw new Error(`Circle element DOM node is not an SVG circle element: ${domNode}.`);
    }

    return new Circle(domNode);
  }
}
