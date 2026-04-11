import type { RectangleLike } from './RectangleLike';

import { Point } from '@rnacanvas/points.oopified';

export class RectangleDefinition {
  centerX = 0;
  centerY = 0;

  /**
   * Have rectangles be upright by default.
   */
  direction = -Math.PI / 2;

  width = 0;
  height = 0;

  cornerRadius = 0;

  static matching(rectangle: RectangleLike): RectangleDefinition {
    let d = new RectangleDefinition();

    d.centerX = rectangle.centerX;
    d.centerY = rectangle.centerY;

    d.direction = rectangle.direction;

    d.width = rectangle.width;
    d.height = rectangle.height;

    d.cornerRadius = rectangle.cornerRadius;

    return d;
  }

  /**
   * Returns an SVG path definition.
   */
  toString(): string {
    let p = new Point(this.centerX, this.centerY);

    p.displace({
      magnitude: this.height / 2,
      direction: this.direction,
    });

    p.displace({
      magnitude: (this.width / 2) - this.cornerRadius,
      direction: this.direction + (Math.PI / 2),
    });

    let d = `M ${p.x} ${p.y}`;

    p.displace({
      magnitude: Math.SQRT2 * this.cornerRadius,
      direction: this.direction + (3 * Math.PI / 4),
    });

    d += ` A ${this.cornerRadius} ${this.cornerRadius} 90 0 1 ${p.x} ${p.y}`;

    p.displace({
      magnitude: this.height - (2 * this.cornerRadius),
      direction: this.direction + Math.PI,
    });

    d += ` L ${p.x} ${p.y}`;

    p.displace({
      magnitude: Math.SQRT2 * this.cornerRadius,
      direction: this.direction + (5 * Math.PI / 4),
    });

    d += ` A ${this.cornerRadius} ${this.cornerRadius} 90 0 1 ${p.x} ${p.y}`;

    p.displace({
      magnitude: this.width - (2 * this.cornerRadius),
      direction: this.direction + (3 * Math.PI / 2),
    });

    d += ` L ${p.x} ${p.y}`;

    p.displace({
      magnitude: Math.SQRT2 * this.cornerRadius,
      direction: this.direction + (7 * Math.PI / 4),
    });

    d += ` A ${this.cornerRadius} ${this.cornerRadius} 90 0 1 ${p.x} ${p.y}`;

    p.displace({
      magnitude: this.height - (2 * this.cornerRadius),
      direction: this.direction,
    });

    d += ` L ${p.x} ${p.y}`;

    p.displace({
      magnitude: Math.SQRT2 * this.cornerRadius,
      direction: this.direction + (9 * Math.PI / 4),
    });

    d += ` A ${this.cornerRadius} ${this.cornerRadius} 90 0 1 ${p.x} ${p.y}`;

    d += ' Z';

    return d;
  }
}
