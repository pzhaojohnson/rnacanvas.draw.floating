import type { Drawing } from './Drawing';

import { TriangleDefinition } from './TriangleDefinition';

import { v4 as uuidv4 } from 'uuid';

import { Box } from '@rnacanvas/boxes';

import { isNonNullObject } from '@rnacanvas/value-check';

import { isString } from '@rnacanvas/value-check';

import { isFiniteNumber } from '@rnacanvas/value-check';

/**
 * A triangle element.
 */
export class Triangle {
  /**
   * Creates a new triangle element from scratch.
   *
   * Will assign a UUID to the newly created triangle element,
   * as well as some default values (e.g., width and height, colors).
   */
  static create(): Triangle {
    let domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    // SVG element IDs must begin with a letter
    domNode.id = 'id-' + uuidv4();

    let triangle = new Triangle(domNode);

    // assign some default values
    triangle.centerX = 0;
    triangle.centerY = 0;

    // make triangles upright by default
    triangle.direction = -Math.PI / 2;

    triangle.width = 6.5;
    triangle.height = 6.5;

    triangle.tailsHeight = 0;

    triangle.domNode.setAttribute('stroke', 'black');
    triangle.domNode.setAttribute('stroke-width', '1');
    triangle.domNode.setAttribute('stroke-opacity', '1');
    triangle.domNode.setAttribute('stroke-linejoin', '');
    triangle.domNode.setAttribute('stroke-dasharray', '');
    triangle.domNode.setAttribute('stroke-linecap', '');

    triangle.domNode.setAttribute('fill', 'white');
    triangle.domNode.setAttribute('fill-opacity', '1');

    return triangle;
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

  get tailsHeight(): number {
    let tailsHeight = Number.parseFloat(this.domNode.dataset.tailsHeight ?? '');

    return Number.isFinite(tailsHeight) ? tailsHeight : 0;
  }

  set tailsHeight(tailsHeight) {
    if (!Number.isFinite(tailsHeight)) {
      console.error(`The specified tails height is nonfinite: ${tailsHeight}.`);
      return;
    }

    this.domNode.dataset.tailsHeight = `${tailsHeight}`;

    this.#reposition();
  }

  /**
   * Bounding box.
   */
  get bbox(): Box {
    return Box.matching(this.domNode.getBBox());
  }

  #reposition(): void {
    let d = new TriangleDefinition();

    d.centerX = this.centerX;
    d.centerY = this.centerY;

    d.direction = this.direction;

    d.width = this.width;
    d.height = this.height;

    d.tailsHeight = this.tailsHeight;

    this.domNode.setAttribute('d', d.toString());
  }

  /**
   * Returns the serialized form of the triangle,
   * which is a JSON-serializable object.
   *
   * Throws if the triangle ID is falsy.
   */
  serialized() {
    if (!this.id) {
      throw new Error('Triangle ID is falsy.');
    }

    return {
      id: this.id,
    };
  }

  /**
   * Recreates a saved triangle given the parent drawing that its DOM node is in.
   *
   * Throws if unable to recreate the saved triangle.
   */
  static recreate(savedTriangle: unknown, parentDrawing: Drawing): Triangle | never {
    if (!isNonNullObject(savedTriangle)) {
      throw new Error(`Saved triangle is not an object: ${savedTriangle}.`);
    }

    if (!savedTriangle.id) {
      throw new Error('Saved triangle ID is falsy.');
    } else if (!isString(savedTriangle.id)) {
      throw new Error(`Saved triangle ID is not a string: ${savedTriangle.id}.`);
    }

    let domNode = parentDrawing.domNode.querySelector('#' + savedTriangle.id);

    if (!domNode) {
      throw new Error('Unable to find saved triangle DOM node in parent drawing by ID.');
    } else if (!(domNode instanceof SVGPathElement)) {
      throw new Error(`DOM node found for saved triangle is not an SVG path element: ${domNode}.`);
    }

    let triangle = new Triangle(domNode);

    // some properties used to be saved as JSON object properties
    if (isFiniteNumber(savedTriangle.width)) {
      triangle.width = savedTriangle.width;
    }

    if (isFiniteNumber(savedTriangle.height)) {
      triangle.height = savedTriangle.height;
    }

    if (isFiniteNumber(savedTriangle.tailsHeight)) {
      triangle.tailsHeight = savedTriangle.tailsHeight;
    }

    // convert rotation to direction (by subtracting Math.PI / 2)
    if (isFiniteNumber(savedTriangle.rotation)) {
      triangle.direction = savedTriangle.rotation - (Math.PI / 2);
    }

    return triangle;
  }
}
