# Installation

With `npm`:

```
npm install @rnacanvas/draw.floating
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// some example imports
import {
  Text,
  Circle,
  Rectangle,
  Triangle,
  StrungText,
  StrungCircle,
  StrungRectangle,
  StrungTriangle,
} from '@rnacanvas/draw.floating';
```

## `class Text`

A text element.

```javascript
var text = Text.create('A');

text.domNode.textContent; // "A"

// set font attributes
text.domNode.setAttribute('font-family', 'Arial');
text.domNode.setAttribute('font-size', '9');

// set color
text.domNode.setAttribute('fill', 'black');

// set center coordinates
text.centerX = 10;
text.centerY = 20;
```

### `static create()`

Creates a text element with specified content.

```javascript
var text = Text.create('A');

text.domNode.textContent; // "A"
```

This method will assign created text elements a UUID.

```javascript
var text = Text.create('A');

// text element has a UUID
text.domNode.id.length >= 36; // true
```

Text elements can be created with empty text content.

```javascript
var text = Text.create();

text.domNode.textContent; // ""
```

### `constructor()`

Constructs a text element wrapping the specified SVG text element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

var text = new Text(domNode);

text.domNode === domNode; // true
```

The input SVG text element is not modified at all during construction of a text element.

This constructor is more meant for internal use
(e.g., when recreating saved text elements).

### `readonly domNode`

The underlying SVG text element corresponding to a text element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

var text = new Text(domNode);

text.domNode === domNode; // true
```

### `readonly id`

The ID of the text element.

Corresponds to the `id` attribute of the underlying SVG text element.

```javascript
var text = Text.create('A');

text.domNode.setAttribute('id', 'id-12345');

text.id; // "id-12345"
```

### `readonly bbox`

The bounding box of the text element.

<b>Note that this method only works correctly if the text element has been added to the document body.</b>

Bounding box calculations in general only work when elements are part of the document body.

```javascript
var text = Text.create('A');

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

svg.setAttribute('viewBox', '0 0 100 200');

svg.append(text.domNode);

document.body.append(svg);

text.centerX = 10;
text.centerY = 20;

// leftmost coordinate
text.bbox.x;

// topmost coordinate
text.bbox.y;

text.bbox.width;
text.bbox.height;
```

See the [Box](https://pzhaojohnson.github.io/rnacanvas.draw.floating/) class
for a full list of bounding box methods and properties.

### `centerX`

Center X coordinate.

<b>This property only works correctly when a text element has been added to the documnt body.</b>

```javascript
var text = Text.create('A');

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

svg.setAttribute('viewBox', '0 0 100 200');

svg.append(text.domNode);

document.body.append(svg);

text.centerX = 25;

text.centerX; // 25
```

### `centerY`

Center Y coordinate.

<b>This property only works correctly when a text element has been added to the documnt body.</b>

```javascript
var text = Text.create('A');

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

svg.setAttribute('viewBox', '0 0 100 200');

svg.append(text.domNode);

document.body.append(svg);

text.centerY = 50;

text.centerY; // 50
```

### `drag()`

Shifs a text element by the specified X and Y amounts.

```javascript
var text = Text.create('A');

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

svg.setAttribute('viewBox', '0 0 100 200');

svg.append(text.domNode);

document.body.append(svg);

text.centerX = 10;
text.centerY = 20;

text.drag(70, 90);

text.centerX; // 80;
text.centerY; // 110
```

### `serialized()`

Returns the serialized form of a strung element,
which is a JOSN-serializable object.

```javascript
var text = Text.create('A');

var savedText = text.serialized();
```

### `static recreate()`

Recreates a saved text element given the parent drawing that its DOM node is in.

```javascript
var text1 = Text.create('A');

// an RNAcanvas drawing
var parentDrawing;

// add the text element
parentDrawing.domNode.append(text1.domNode);

var savedText = text1.serialized();

var text2 = Text.recreate(savedText, parentDrawing);

// same DOM node
text2.domNode === text1.domNode; // true

// different objects
text2 === text1; // false
```

<b>All drawing elements in RNAcanvas must have a unique ID for drawings to be savable
and for undo / redo functionality to work.</b>

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

Constructs a circle element wrapping an SVG circle element.

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

### `readonly id`

The ID of the circle element
(as defined by the `id` attribute of its underlying DOM node).

```javascript
var circle = Circle.create();

// the `create()` static method automatically assigns a UUID
circle.id.length >= 36; // true

circle.domNode.getAttribute('id').length >= 36; // true
```

<b>All drawing elements must have a unique ID for RNAcanvas drawings to be savable
and for undo / redo functionality to work.</b>

### `centerX`

Center X coordinate.

Corresponds to the `cx` attribute of the underlying DOM node.

```javascript
var circle = Circle.create();

circle.centerX = 23;

circle.domNode.getAttribute('cx'); // "23"

circle.domNode.setAttribute('cx', '12');

circle.centerX; // 12
```


### `centerY`

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

## `class Rectangle`

A rectangle element.

```javascript
var rectangle = Rectangle.create();

// set center coordinates
rectangle.centerX = 10;
rectangle.centerY = 20;

rectangle.width = 15;
rectangle.height = 25;

// controls how rounded the corners are
rectangle.cornerRadius = 5;

// black stroke
rectangle.domNode.setAttribute('stroke', 'black');
rectangle.domNode.setAttribute('stroke-width', '1');

// white filling
rectangle.domNode.setAttribute('fill', 'white');
```

### `static create()`

Creates a new rectangle from scratch.

```javascript
var rectangle = Rectangle.create();
```

The rectangle will be created with a UUID
and with some default values
(e.g., width and height, stroke and fill colors).

### `constructor()`

Constructs a new rectangle instance wrapping the specified SVG path element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

var rectangle = new Rectangle(domNode);

rectangle.domNode === domNode; // true
```

The input SVG path element is not modified in any way by this constructor.

This constructor is more meant for internal use
(e.g., when recreating saved rectangle elements).

### `readonly domNode`

The SVG path element corresponding to the rectangle element.

```javascript
var rectangle = Rectangle.create();

rectangle.domNode instanceof SVGPathElement; // true
```

### `readonly id`

The ID of the rectangle.

Is equal to the `id` attribute of the underlying SVG path element.

```javascript
var rectangle = Rectangle.create();

rectangle.domNode.setAttribute('id', 'id-12345');

rectangle.id; // "id-12345"
```

<b>All drawing elements must have a unique ID for RNAcanvas drawings to be savable
and for undo / redo functionality to work.</b>

Note that the `create()` static method already creates rectangles with a UUID.

(IDs should generally not be changed after being initialized.)

### `centerX`

Center X coordinate.

```javascript
var rectangle = Rectangle.create();

rectangle.centerX = 10;

// is stored under the `data-center-x` attribute
rectangle.domNode.dataset.centerX; // "10"
```

This value is stored under the `data-center-x` attribute,
which allows for watching for changes to it using mutation observers.

### `centerY`

Center Y coordinate.

```javascript
var rectangle = Rectangle.create();

rectangle.centerY = 20;

// is stored under the `data-center-y` attribute
rectangle.domNode.dataset.centerY; // "20"
```

This value is stored under the `data-center-y` attribute,
which allows for watching for changes to it using mutation observers.

### `drag()`

Move the center coordinates of a rectangle by the specified X and Y amounts.

```javascript
var rectangle = Rectangle.create();

rectangle.centerX = 10;
rectangle.centerY = 20;

rectangle.drag(5, -2);

rectangle.centerX; // 15
rectangle.centerY; // 18
```

### `direction`

The direction of the rectangle (in radians).

```javascript
var rectangle = Rectangle.create();

// rectangles are created upright by default
rectangle.direction; // -Math.PI / 2

// "pointing" to the left
rectangle.direction = Math.PI;

// "pointing" to the right
rectangle.direction = 0;

// is stored under the `data-direction` attribute
rectangle.domNode.dataset.direction; // "0"
```

This value is stored under the `data-direction` attribute,
which allows for watching for changes to it using mutation observers.

### `width`

The width of a rectangle.

```javascript
var rectangle = Rectangle.create();

rectangle.width = 30;

// is stored under the `data-width` attribute
rectangle.domNode.dataset.width; // "30"
```

This value is stored under the `data-width` attribute,
which allows for watching for changes to it using mutation observers.

### `height`

The height of a rectangle.

```javascript
var rectangle = Rectangle.create();

rectangle.height = 50;

// is stored under the `data-height` attribute
rectangle.domNode.dataset.height; // "50"
```

This value is stored under the `data-height` attribute,
which allows for watching for changes to it using mutation observers.

### `cornerRadius`

Controls how rounded the corners of a rectangle are.

```javascript
var rectangle = Rectangle.create();

rectangle.cornerRadius = 5;

// is stored under the `data-corner-radius` attribute
rectangle.domNode.dataset.cornerRadius; // "5"
```

This value is stored under the `data-corner-radius` attribute,
which allows for watching for changes to it using mutation observers.

### `readonly bbox`

The bounding box of a rectangle.

<b>Bounding boxes can only be calculated
when drawing elements have been added to the document body.</b>

```javascript
var rectangle = Rectangle.create();

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

svg.append(rectangle.domNode);

// add everything to the document body
document.body.append(svg);

rectangle.centerX = 0;
rectangle.centerY = 0;

rectangle.width = 10;
rectangle.height = 20;

rectangle.bbox.x; // -5
rectangle.bbox.y; // -10
rectangle.bbox.width; // 10
rectangle.bbox.height; // 20
```

See [Box](https://pzhaojohnson.github.io/rnacanvas.boxes/) class documentation
for a full list of bounding box methods and properties.

### `serialized()`

Returns the serialized form of a rectangle,
which is a JSON-serializable object.

```javascript
var rectangle = Rectangle.create();

var savedRectangle = rectangle.serialized();
```

Throws if the ID of the rectangle is falsy.

<b>Rectangles must have an ID to be serializable.</b>

### `static recreate()`

Recreates a saved rectangle given the parent drawing that its DOM node is in.

```javascript
var rectangle1 = Rectangle.create();

var savedRectangle = rectangle1.serialized();

// an RNAcanvas drawing
parentDrawing;

var rectangle2 = Rectangle.recreate(savedRectangle, parentDrawing);

// share the same DOM node
rectangle2.domNode === rectangle1.domNode; // true

rectangle2 === rectangle1; // false
```

## `class Triangle`

A triangle element.

```javascript
var triangle = Triangle.create();

// set center coordinates
triangle.centerX = 10;
triangle.centerY = 20;

triangle.width = 15;
triangle.height = 25;

// black stroke
triangle.domNode.setAttribute('stroke', 'black');
triangle.domNode.setAttribute('stroke-width', '1');

// white filling
triangle.domNode.setAttribute('fill', 'white');
```

### `static create()`

Creates a new triangle from scratch.

```javascript
var triangle = Triangle.create();
```

The triangle will be created with a UUID
and with some default values
(e.g., width and height, stroke and fill colors).

### `constructor()`

Constructs a new triangle instance wrapping the specified SVG path element.

```javascript
var domNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

var triangle = new Triangle(domNode);

triangle.domNode === domNode; // true
```

The input SVG path element is not modified in any way by this constructor.

This constructor is more meant for internal use
(e.g., when recreating saved triangle elements).

### `readonly domNode`

The SVG path element corresponding to the triangle element.

```javascript
var triangle = Triangle.create();

triangle.domNode instanceof SVGPathElement; // true
```

### `readonly id`

The ID of the triangle.

Is equal to the `id` attribute of the underlying SVG path element.

```javascript
var triangle = Triangle.create();

triangle.domNode.setAttribute('id', 'id-12345');

triangle.id; // "id-12345"
```

<b>All drawing elements must have a unique ID for RNAcanvas drawings to be savable
and for undo / redo functionality to work.</b>

Note that the `create()` static method already creates triangles with a UUID.

(IDs should generally not be changed after being initialized.)

### `centerX`

Center X coordinate.

```javascript
var triangle = Triangle.create();

triangle.centerX = 10;

// is stored under the `data-center-x` attribute
triangle.domNode.dataset.centerX; // "10"
```

This value is stored under the `data-center-x` attribute,
which allows for watching for changes to it using mutation observers.

### `centerY`

Center Y coordinate.

```javascript
var triangle = Triangle.create();

triangle.centerY = 20;

// is stored under the `data-center-y` attribute
triangle.domNode.dataset.centerY; // "20"
```

This value is stored under the `data-center-y` attribute,
which allows for watching for changes to it using mutation observers.

### `drag()`

Move the center coordinates of a triangle by the specified X and Y amounts.

```javascript
var triangle = Triangle.create();

triangle.centerX = 10;
triangle.centerY = 20;

triangle.drag(5, -2);

triangle.centerX; // 15
triangle.centerY; // 18
```

### `direction`

The direction of the triangle (in radians).

```javascript
var triangle = Triangle.create();

// triangles are created upright by default
triangle.direction; // -Math.PI / 2

// "pointing" to the left
triangle.direction = Math.PI;

// "pointing" to the right
triangle.direction = 0;

// is stored under the `data-direction` attribute
triangle.domNode.dataset.direction; // "0"
```

This value is stored under the `data-direction` attribute,
which allows for watching for changes to it using mutation observers.

### `width`

The width of a triangle.

```javascript
var triangle = Triangle.create();

triangle.width = 30;

// is stored under the `data-width` attribute
triangle.domNode.dataset.width; // "30"
```

This value is stored under the `data-width` attribute,
which allows for watching for changes to it using mutation observers.

### `height`

The height of a triangle.

```javascript
var triangle = Triangle.create();

triangle.height = 50;

// is stored under the `data-height` attribute
triangle.domNode.dataset.height; // "50"
```

This value is stored under the `data-height` attribute,
which allows for watching for changes to it using mutation observers.

### `tailsHeight`

Controls the height between the bottom corners of a triangle
and the midpoint of its base.

A positive tails height results in a triangle appearing as a "barbed" arrow.

A negative tails height results in a triangle appearing as a diamond arrow.

```javascript
var triangle = Triangle.create();

triangle.tailsHeight = 5;

// is stored under the `data-tails-height` attribute
triangle.domNode.dataset.tailsHeight; // "5"
```

This value is stored under the `data-tails-height` attribute,
which allows for watching for changes to it using mutation observers.

### `readonly bbox`

The bounding box of a triangle.

<b>Bounding boxes can only be calculated
when drawing elements have been added to the document body.</b>

```javascript
var triangle = Triangle.create();

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

svg.append(triangle.domNode);

// add everything to the document body
document.body.append(svg);

triangle.centerX = 0;
triangle.centerY = 0;

triangle.width = 10;
triangle.height = 20;

triangle.bbox.x; // -5
triangle.bbox.y; // -10
triangle.bbox.width; // 10
triangle.bbox.height; // 20
```

See [Box](https://pzhaojohnson.github.io/rnacanvas.boxes/) class documentation
for a full list of bounding box methods and properties.

### `serialized()`

Returns the serialized form of a triangle,
which is a JSON-serializable object.

```javascript
var triangle = Triangle.create();

var savedTriangle = triangle.serialized();
```

Throws if the ID of the triangle is falsy.

<b>Triangles must have an ID to be serializable.</b>

### `static recreate()`

Recreates a saved triangle given the parent drawing that its DOM node is in.

```javascript
var triangle1 = Triangle.create();

var savedTriangle = triangle1.serialized();

// an RNAcanvas drawing
parentDrawing;

var triangle2 = Triangle.recreate(savedTriangle, parentDrawing);

// share the same DOM node
triangle2.domNode === triangle1.domNode; // true

triangle2 === triangle1; // false
```

## `class StrungText`

A strung text element.

```javascript
var owner = someBond;

var strungText = StrungText.on(owner);

strungText.owner === owner; // true

strungText.domNode instanceof SVGTextElement; // true
```

### `static on()`

Creates a new strung text element for the specified owner.

```javascript
var owner = someBond;

var strungText = StrungText.on(owner);

strungText.owner === owner; // true
```

This method creates a new text element under the hood and wraps it in a strung text element.

### `constructor()`

Constructs a strung text element wrapping the specified text element and owner.

```javascript
var text = Text.create('A');

var owner = someBond;

var strungText = new StrungText(text, owner);

strungText.domNode === text.domNode; // true

strungText.owner === owner; // true
```

The wrapped text element is not modified in any way during construction.

### `readonly domNode`

The underlying SVG text element corresponding to the strung text element.

```javascript
var text = Text.create('A');

var owner = someBond;

var strungText = new StrungText(text, owner);

strungText.domNode === text.domNode; // true
```

### `owner`

The owner of the strung text element.

```javascript
var owner = someBond;

var strungText = StrungText.on(owner);

strungText.owner === owner; // true
```

This is typically the bond or other element that the strung item is attached to.

### `textContent`

The text content of the wrapped text element.

```javascript
var text = Text.create('A');

var owner = someBond;

var strungText = new StrungText(text, owner);

strungText.textContent; // "A"

strungText.domNode.textContent = 'B';

strungText.textContent; // "B"
```

### `save()`

Returns the serialized form of the strung text element,
which is a JSON-serializable object.

```javascript
var owner = someBond;

var strungText = StrungText.on(owner);

var savedStrungText = strungText.save();

savedStrungText.text.id; // has a UUID
savedStrungText.ownerID; // the owner bond ID
```

### `static recreate()`

Recreates a saved strung text element given the parent drawing that its DOM node is in.

```javascript
var owner = someBond;

var strungText1 = StrungText.on(owner);

parentDrawing.domNode.append(strungText1.domNode);

var savedStrungText = strungText1.save();

var strungText2 = StrungText.recreate(savedStrungText, parentDrawing);

strungText2.domNode === strungText1.domNode; // true

strungText2.owner === owner; // true

strungText2 === strungText1; // false
```

## `class StrungCircle`

A strung circle element.

```javascript
var owner = someBond;

var strungCircle = StrungCircle.on(owner);

strungCircle.owner === owner; // true

strungCircle.domNode instanceof SVGCircleElement; // true
```

### `static on()`

Creates a new strung circle element for the specified owner.

```javascript
var owner = someBond;

var strungCircle = StrungCircle.on(owner);

strungCircle.owner === owner; // true
```

This method creates a new circle element under the hood and wraps it in a strung circle element.

### `constructor()`

Constructs a strung circle element wrapping the specified circle element and owner.

```javascript
var circle = Circle.create();

var owner = someBond;

var strungCircle = new StrungCircle(circle, owner);

strungCircle.domNode === circle.domNode; // true

strungCircle.owner === owner; // true
```

### `readonly domNode`

The underlying SVG circle element corresponding to the strung circle element.

```javascript
var circle = Circle.create();

var owner = someBond;

var strungCircle = new StrungCircle(circle, owner);

strungCircle.domNode === circle.domNode; // true
```

### `owner`

The owner of the strung circle element.

```javascript
var owner = someBond;

var strungCircle = StrungCircle.on(owner);

strungCircle.owner === owner; // true
```

### `save()`

Returns the serialized form of the strung circle element,
which is a JSON-serializable object.

```javascript
var owner = someBond;

var strungCircle = StrungCircle.on(owner);

var savedStrungCircle = strungCircle.save();

savedStrungCircle.circle.id; // has a UUID
savedStrungCircle.ownerID; // the owner bond ID
```

### `static recreate()`

Recreates a saved strung circle element given the parent drawing that its DOM node is in.

```javascript
var owner = someBond;

var strungCircle1 = StrungCircle.on(owner);

parentDrawing.domNode.append(strungCircle1.domNode);

var savedStrungCircle = strungCircle1.save();

var strungCircle2 = StrungCircle.recreate(savedStrungCircle, parentDrawing);

strungCircle2.domNode === strungCircle1.domNode; // true

strungCircle2.owner === owner; // true

strungCircle2 === strungCircle1; // false
```

## `class StrungRectangle`

A strung rectangle element.

```javascript
var owner = someBond;

var strungRectangle = StrungRectangle.on(owner);

strungRectangle.owner === owner; // true

strungRectangle.domNode instanceof SVGPathElement; // true
```

### `static on()`

Creates a new strung rectangle element for the specified owner.

```javascript
var owner = someBond;

var strungRectangle = StrungRectangle.on(owner);

strungRectangle.owner === owner; // true
```

This method creates a new rectangle element under the hood and wraps it in a strung rectangle element.

### `constructor()`

Constructs a strung rectangle element wrapping the specified rectangle element and owner.

```javascript
var rectangle = Rectangle.create();

var owner = someBond;

var strungRectangle = new StrungRectangle(rectangle, owner);

strungRectangle.domNode === rectangle.domNode; // true

strungRectangle.owner === owner; // true
```

### `readonly domNode`

The underlying SVG path element corresponding to the strung rectangle element.

```javascript
var rectangle = Rectangle.create();

var owner = someBond;

var strungRectangle = new StrungRectangle(rectangle, owner);

strungRectangle.domNode === rectangle.domNode; // true
```

### `owner`

The owner of the strung rectangle element.

```javascript
var owner = someBond;

var strungRectangle = StrungRectangle.on(owner);

strungRectangle.owner === owner; // true
```

### `width`

The width of the wrapped rectangle element.

```javascript
var owner = someBond;

var strungRectangle = StrungRectangle.on(owner);

strungRectangle.width = 12.4;

strungRectangle.width; // 12.4
```

### `height`

The height of the wrapped rectangle element.

```javascript
var owner = someBond;

var strungRectangle = StrungRectangle.on(owner);

strungRectangle.height = 18.7;

strungRectangle.height; // 18.7
```

### `cornerRadius`

Controls how rounded the corners of the wrapped rectangle are.

```javascript
var owner = someBond;

var strungRectangle = StrungRectangle.on(owner);

strungRectangle.cornerRadius = 8.21;

strungRectangle.cornerRadius; // 8.21
```

### `save()`

Returns the serialized form of the strung rectangle element,
which is a JSON-serializable object.

```javascript
var owner = someBond;

var strungRectangle = StrungRectangle.on(owner);

var savedStrungRectangle = strungRectangle.save();

savedStrungRectangle.rectangle.id; // has a UUID
savedStrungRectangle.ownerID; // the owner bond ID
```

### `static recreate()`

Recreates a saved strung rectangle element given the parent drawing that its DOM node is in.

```javascript
var owner = someBond;

var strungRectangle1 = StrungRectangle.on(owner);

parentDrawing.domNode.append(strungRectangle1.domNode);

var savedStrungRectangle = strungRectangle1.save();

var strungRectangle2 = StrungRectangle.recreate(savedStrungRectangle, parentDrawing);

strungRectangle2.domNode === strungRectangle1.domNode; // true

strungRectangle2.owner === owner; // true

strungRectangle2 === strungRectangle1; // false
```

## `class StrungTriangle`

A strung triangle element.

```javascript
var owner = someBond;

var strungTriangle = StrungTriangle.on(owner);

strungTriangle.owner === owner; // true

strungTriangle.domNode instanceof SVGPathElement; // true
```

### `static on()`

Creates a new strung triangle element for the specified owner.

```javascript
var owner = someBond;

var strungTriangle = StrungTriangle.on(owner);

strungTriangle.owner === owner; // true
```

This method creates a new triangle element under the hood and wraps it in a strung triangle element.

### `constructor()`

Constructs a strung triangle element wrapping the specified triangle element and owner.

```javascript
var triangle = Triangle.create();

var owner = someBond;

var strungTriangle = new StrungTriangle(triangle, owner);

strungTriangle.domNode === triangle.domNode; // true

strungTriangle.owner === owner; // true
```

### `readonly domNode`

The underlying SVG path element corresponding to the strung triangle element.

```javascript
var triangle = Triangle.create();

var owner = someBond;

var strungTriangle = new StrungTriangle(triangle, owner);

strungTriangle.domNode === triangle.domNode; // true
```

### `owner`

The owner of the strung triangle element.

```javascript
var owner = someBond;

var strungTriangle = StrungTriangle.on(owner);

strungTriangle.owner === owner; // true
```

### `width`

The width of the wrapped triangle element.

```javascript
var owner = someBond;

var strungTriangle = StrungTriangle.on(owner);

strungTriangle.width = 12.4;

strungTriangle.width; // 12.4
```

### `height`

The height of the wrapped triangle element.

```javascript
var owner = someBond;

var strungTriangle = StrungTriangle.on(owner);

strungTriangle.height = 18.7;

strungTriangle.height; // 18.7
```

### `tailsHeight`

Controls the tails height of the wrapped triangle element.

```javascript
var owner = someBond;

var strungTriangle = StrungTriangle.on(owner);

strungTriangle.tailsHeight = 7.5;

strungTriangle.tailsHeight; // 7.5
```

### `save()`

Returns the serialized form of the strung triangle element,
which is a JSON-serializable object.

```javascript
var owner = someBond;

var strungTriangle = StrungTriangle.on(owner);

var savedStrungTriangle = strungTriangle.save();

savedStrungTriangle.triangle.id; // has a UUID
savedStrungTriangle.ownerID; // the owner bond ID
```

### `static recreate()`

Recreates a saved strung triangle element given the parent drawing that its DOM node is in.

```javascript
var owner = someBond;

var strungTriangle1 = StrungTriangle.on(owner);

parentDrawing.domNode.append(strungTriangle1.domNode);

var savedStrungTriangle = strungTriangle1.save();

var strungTriangle2 = StrungTriangle.recreate(savedStrungTriangle, parentDrawing);

strungTriangle2.domNode === strungTriangle1.domNode; // true

strungTriangle2.owner === owner; // true

strungTriangle2 === strungTriangle1; // false
```
