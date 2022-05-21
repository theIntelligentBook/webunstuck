### Canvas

* Gives you an element you can draw into using JavaScript

* The graphics context returned by `getContext("2d")` has the drawing commands

* Let's start with a simple example...

---

### Simple Canvas example

```html
<!DOCTYPE html>
<html>
  <title>Canvas example</title>
  <div>
      <canvas id="thecanvas" width="640" height="480"></canvas>
  </div>
  <script src="canvasexample.js"></script>
</html>
```



```js
var c = document.getElementById("thecanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(200,100);
ctx.stroke();
```

---

### Begin path, stroke, fill

You can gather together a set of drawing commands

* Start with `beginPath`



* Follow with `moveTo`, `lineTo` and other drawing commands.



* Then, `stroke()` will draw outlines using `strokeStyle`; `fill()` will fill using `fillStyle`



```js
ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.moveTo(20, 20);
ctx.lineTo(200, 20);
ctx.stroke();
```

[Demo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath)

---

### Arcs, not circles

* There's no `fillCircle` or `strokeCircle` functions; instead use arc

* Note that angles are in *radians* (2&pi; radians = 360&deg;)

```js
ctx.arc(x,y,radius,startAngle,endAngle);
```

---

### Text

* Use `fillText(text, x, y, maxWidth)` to draw filled-in text

* Use `strokeText(text, x, y, maxWidth)` to draw outlines of letters

[Demo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText)

* Note, this is going to be handy when we do WebGL  
  (WebGL is a 3d rendering toolkit, but it doesn't include text-drawing, so we'll need to do that with Canvas)

---

### Translate

* Sometimes, we're drawing objects that we want to move on the canvas

* Rather than changing the coordinates of all the coordinates, it can be easier to think of "move to x,y and then draw the shape"

* This can be done with `ctx.translate()`  [Demo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate)

* Likewise for rotation with `ctx.rotate()` [Demo](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate)

---

### Compositing

* By default, if you paint one object over another it just paints over the top. But there are other *compositing* options. These can be controlled using the `globalCompositeOperation` property of the graphics context.



  * painting only where the destination is already opaque (`destination-in`)



  * combining the images and making the overlap lighter by combining their colours (`lighter`)



  * exclusive or (`xor`)



  * take the brightness of one, but the hue and saturation of the other (`luminosity`)



Let's look at a [demo of compositing](canvas/composite.html)

---

### When to use Canvas

* A key difference between Canvas and the next tool we'll see (SVG) is that the canvas is a *single element*



* That means you can't use CSS to style its contents (only the canvas as a whole)



* It also means that if you attach event listeners, they are event listeners on the canvas not on items you've drawn within it



* Quick at compositing, or if there's lots of objects

---

### Over to you...

* Plenty more drawing methods available. Have a look at the [API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

* Let's have a look at another small [demo](http://turing.une.edu.au/~cosc360/sync/lectures/cosc360/canvas/index.html)...