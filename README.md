# Installation

With `npm`:

```
npm install @rnacanvas/draw.floating
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// an example import
import { Circle } from '@rnacanvas/draw.floating';
```

## `class Circle`

A circle element.

```javascript
var circle = Circle.create();

// set radius
circle.domNode.setAttribute('r', '6');

// set line color and width
circle.domNode.setAttribute('stroke', 'black');
circle.domNode.setAttribute('stroke-width', '1');

// set center coordinates
circle.centerX = 50;
circle.centerY = 10;
```

## `static create()`

Creates a circle element from scratch.

Circle elements will be created with a UUID
and some default values (e.g., radius, line color and width, fill color).

```javascript
var circle = Circle.create();

circle.id.length >= 36; // has a UUID
```

## `constructor()`

Creates a circle element wrapping an SVG circle element.

The input SVG circle element is not modified at all during construction of a circle element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

var circle = new Circle(domNode);

circle.domNode === domNode; // true
```

This constructor is more meant for internal use
(e.g., when recrating saved circle elements).

## `readonly domNode`

The underlying SVG circle element corresponding to the circle element.

```javascript
var circle = Circle.create();

circle.domNode instanceof SVGCircleElement; // true
```
