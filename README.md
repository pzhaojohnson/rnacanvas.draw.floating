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

### `static create()`

Creates a circle element from scratch.

Circle elements will be created with a UUID
and some default values (e.g., radius, line color and width, fill color).

```javascript
var circle = Circle.create();

circle.id.length >= 36; // has a UUID
```

### `constructor()`

Creates a circle element wrapping an SVG circle element.

The input SVG circle element is not modified at all during construction of a circle element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

var circle = new Circle(domNode);

circle.domNode === domNode; // true
```

This constructor is more meant for internal use
(e.g., when recrating saved circle elements).

### `readonly domNode`

The underlying SVG circle element corresponding to the circle element.

```javascript
var circle = Circle.create();

circle.domNode instanceof SVGCircleElement; // true
```

### `readonly id()`

The ID of the circle element
(as defined by the `id` attribute of its underlying DOM node).

```javascript
var circle = Circle.create();

// the `create()` static method automatically assigns a UUID
circle.id.length >= 36; // true

circle.domNode.getAttribute('id').length >= 36; // true
```

<b>All drawing elements must have a unique ID for RNAcanvas drawings to be savable
and for undo / redo functionalitty to work.</b>

### `centerX()`

Center X coordinate.

Corresponds to the `cx` attribute of the underlying DOM node.

```javascript
var circle = Circle.create();

circle.centerX = 23;

circle.domNode.getAttribute('cx'); // "23"

circle.domNode.setAttribute('cx', '12');

circle.centerX; // 12
```


### `centerY()`

Center Y coordinate.

Corresponds to the `cy` attribute of the underlying DOM node.

```javascript
var circle = Circle.create();

circle.centerY = -12;

circle.domNode.getAttribute('cy'); // "-12"

circle.domNode.setAttribute('cy', '22');

circle.centerY; // 22
```

### `drag()`

Moves the circle element by the specified X and Y amounts.

```javascript
var circle = Circle.create();

circle.centerX = 10;
circle.centerY = 20;

circle.drag(100, 200);

circle.centerX; // 110
circle.centerY; // 220
```

### `direction`

Circle elements don't actually have a direction associated with them.

This property is included primarily for compatibilty with other interfaces within RNAcanvas
(e.g., those involving strung elements).

This property will always have a value of 0.

```javascript
var circle = Circle.create();

circle.direction; // 0

circle.direction = 1;

// still zero
circle.direction; // 0
```

### `serialized()`

Returns the serialized form of the circle element,
which is a JSON-serializable object.

```javascript
var circle = Circle.create();

var savedCircle = circle.serialized();
```

### `static recreate()`

Recreates a saved circle element given its JSON-serializable form
and the parent drawing that its DOM node is in.

```javascript
var circle1 = Circle.create();

// an RNAcanvas drawing
parentDrawing;

// add the circle element to the drawing
parentDrawing.domNode.append(circle1.domNode);

var savedCircle = circle1.serialized();

// recreate
var circle2 = Circle.create(savedCircle, parentDrawing);

circle2.domNode === circle1.domNode; // true

circle2 === circle1 // false
```
