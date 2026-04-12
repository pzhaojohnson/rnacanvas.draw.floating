import type { Drawing } from './Drawing';

import { RectangleDefinition } from './RectangleDefinition';

import { v4 as uuidv4 } from 'uuid';

import { Box } from '@rnacanvas/boxes';

import { isNonNullObject } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';

import { isFiniteNumber } from '@rnacanvas/value-check';

/**
 * A rectangle element.
 */
export class Rectangle {
  /**
   * Creates a new rectangle element from scratch.
   *
   * Will assign a UUID to the newly created rectangle element,
   * as well as some default values (e.g., width and height, colors).
   */
  static create(): Rectangle {
    let domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    // SVG element IDs must begin with a letter
    domNode.id = 'id-' + uuidv4();

    let rectangle = new Rectangle(domNode);

    // assign some default values
    rectangle.centerX = 0;
    rectangle.centerY = 0;

    // make rectangles upright by default
    rectangle.direction = -Math.PI / 2;

    rectangle.width = 5.5;
    rectangle.height = 5.5;

    rectangle.cornerRadius = 0;

    rectangle.domNode.setAttribute('stroke', 'black');
    rectangle.domNode.setAttribute('stroke-width', '1');
    rectangle.domNode.setAttribute('stroke-opacity', '1');
    rectangle.domNode.setAttribute('stroke-linejoin', '');
    rectangle.domNode.setAttribute('stroke-dasharray', '');
    rectangle.domNode.setAttribute('stroke-linecap', '');

    rectangle.domNode.setAttribute('fill', 'white');
    rectangle.domNode.setAttribute('fill-opacity', '1');

    return rectangle;
  }

  constructor(readonly domNode: SVGPathElement) {
    if (!domNode.dataset.centerX) {
      this.#cacheCenterX();
    }

    if (!domNode.dataset.centerY) {
      this.#cacheCenterY();
    }
  }

  #cacheCenterX(): void {
    let bbox = Box.matching(this.domNode.getBBox());

    this.domNode.dataset.centerX = `${bbox.centerX}`;
  }

  #cacheCenterY(): void {
    let bbox = Box.matching(this.domNode.getBBox());

    this.domNode.dataset.centerY = `${bbox.centerY}`;
  }

  get id(): string {
    return this.domNode.id;
  }

  /**
   * Center X coordinate.
   */
  get centerX(): number {
    let centerX = Number.parseFloat(this.domNode.dataset.centerX ?? '');

    return Number.isFinite(centerX) ? centerX : 0;
  }

  set centerX(centerX) {
    if (!Number.isFinite(centerX)) {
      console.error(`The specified center X coordinate is nonfinite: ${centerX}.`);
      return;
    }

    this.domNode.dataset.centerX = `${centerX}`;

    this.#reposition();
  }

  /**
   * Center Y coordinate.
   */
  get centerY(): number {
    let centerY = Number.parseFloat(this.domNode.dataset.centerY ?? '');

    return Number.isFinite(centerY) ? centerY : 0;
  }

  set centerY(centerY) {
    if (!Number.isFinite(centerY)) {
      console.error(`The specified center Y coordinate is nonfinite: ${centerY}.`);
      return;
    }

    this.domNode.dataset.centerY = `${centerY}`;

    this.#reposition();
  }

  drag(x: number, y: number): void {
    this.centerX += x;
    this.centerY += y;
  }

  get direction(): number {
    let direction = Number.parseFloat(this.domNode.dataset.direction ?? '');

    return Number.isFinite(direction) ? direction : 0;
  }

  set direction(direction) {
    if (!Number.isFinite(direction)) {
      console.error(`The specified direction angle is nonfinite: ${direction}.`);
      return;
    }

    this.domNode.dataset.direction = `${direction}`;

    this.#reposition();
  }

  get width(): number {
    let width = Number.parseFloat(this.domNode.dataset.width ?? '');

    return Number.isFinite(width) ? width : 0;
  }

  set width(width) {
    if (!Number.isFinite(width)) {
      console.error(`The specified width is nonfinite: ${width}.`);
      return;
    }

    this.domNode.dataset.width = `${width}`;

    this.#reposition();
  }

  get height(): number {
    let height = Number.parseFloat(this.domNode.dataset.height ?? '');

    return Number.isFinite(height) ? height : 0;
  }

  set height(height) {
    if (!Number.isFinite(height)) {
      console.error(`The specified height is nonfinite: ${height}.`);
      return;
    }

    this.domNode.dataset.height = `${height}`;

    this.#reposition();
  }

  get cornerRadius(): number {
    let cornerRadius = Number.parseFloat(this.domNode.dataset.cornerRadius ?? '');

    return Number.isFinite(cornerRadius) ? cornerRadius : 0;
  }

  set cornerRadius(cornerRadius) {
    if (!Number.isFinite(cornerRadius)) {
      console.error(`The specified corner radius is nonfinite: ${cornerRadius}.`);
      return;
    }

    this.domNode.dataset.cornerRadius = `${cornerRadius}`;

    this.#reposition();
  }

  /**
   * Bounding box.
   */
  get bbox(): Box {
    return Box.matching(this.domNode.getBBox());
  }

  #reposition(): void {
    let d = new RectangleDefinition();

    d.centerX = this.centerX;
    d.centerY = this.centerY;

    d.direction = this.direction;

    d.width = this.width;
    d.height = this.height;

    d.cornerRadius = this.cornerRadius;

    this.domNode.setAttribute('d', d.toString());
  }

  /**
   * Returns the serialized form of the rectangle,
   * which is a JSON-serializable object.
   *
   * Throws if the rectangle ID is falsy.
   */
  serialized() {
    if (!this.id) {
      throw new Error('Rectangle ID is falsy.');
    }

    return {
      id: this.id,
    };
  }

  /**
   * Recreates a saved rectangle given the parent drawing that its DOM node is in.
   *
   * Throws if unable to recreate the saved rectangle.
   */
  static recreate(savedRectangle: unknown, parentDrawing: Drawing): Rectangle | never {
    if (!isNonNullObject(savedRectangle)) {
      throw new Error(`Saved rectangle is not an object: ${savedRectangle}.`);
    }

    if (!savedRectangle.id) {
      throw new Error('Saved rectangle ID is falsy.');
    } else if (!isString(savedRectangle.id)) {
      throw new Error(`Saved rectangle ID is not a string: ${savedRectangle.id}.`);
    }

    let domNode = parentDrawing.domNode.querySelector('#' + savedRectangle.id);

    if (!domNode) {
      throw new Error('Unable to find saved rectangle DOM node in parent drawing by ID.');
    } else if (!(domNode instanceof SVGPathElement)) {
      throw new Error(`DOM node found for saved rectangle is not an SVG path element: ${domNode}.`);
    }

    let rectangle = new Rectangle(domNode);

    // some properties used to be saved as JSON object properties
    if (isFiniteNumber(savedRectangle.width)) {
      rectangle.width = savedRectangle.width;
    }

    if (isFiniteNumber(savedRectangle.height)) {
      rectangle.height = savedRectangle.height;
    }

    // corner radius used to be called border radius
    if (isFiniteNumber(savedRectangle.borderRadius)) {
      rectangle.cornerRadius = savedRectangle.borderRadius;
    }

    // convert rotation to direction (by subtracting Math.PI / 2)
    if (isFiniteNumber(savedRectangle.rotation)) {
      rectangle.direction = savedRectangle.rotation - (Math.PI / 2);
    }

    return rectangle;
  }
}
