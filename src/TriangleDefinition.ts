import { Point } from '@rnacanvas/points.oopified';

export class TriangleDefinition {
  centerX = 0;
  centerY = 0;

  /**
   * Make triangles upright by default.
   */
  direction = -Math.PI / 2;

  width = 0;
  height = 0;

  tailsHeight = 0;

  /**
   * Returns an SVG path definition.
   */
  toString(): string {
    let centerPoint = new Point(this.centerX, this.centerY);

    let topPoint = centerPoint.displaced({
      magnitude: this.height / 2,
      direction: this.direction,
    });

    let bottomLeftPoint = (
      centerPoint
        .displaced({
          magnitude: this.width / 2,
          direction: this.direction - (Math.PI / 2),
        })
        .displaced({
          magnitude: this.height / 2,
          direction: this.direction + Math.PI,
        })
    );

    let bottomRightPoint = (
      centerPoint
        .displaced({
          magnitude: this.width / 2,
          direction: this.direction + (Math.PI / 2),
        })
        .displaced({
          magnitude: this.height / 2,
          direction: this.direction + Math.PI,
        })
    );

    let bottomMidpoint = centerPoint.displaced({
      magnitude: (this.height / 2) - this.tailsHeight,
      direction: this.direction + Math.PI,
    });

    return (
      `M ${topPoint.x} ${topPoint.y}`
      + ` L ${bottomRightPoint.x} ${bottomRightPoint.y}`
      + ` L ${bottomMidpoint.x} ${bottomMidpoint.y}`
      + ` L ${bottomLeftPoint.x} ${bottomLeftPoint.y}`
      + ' Z'
    );
  }
}
