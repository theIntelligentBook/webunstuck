## SVG

* Canvas lets us *draw* vector graphics, but only using JavaScript -- the drawing isn't in the HTML

* SVG introduces nodes that can represent elements of a vector graphic, such as lines and curves

---

## Example

```svg
<svg width="200" height="200" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100"/>
</svg>
```

<svg width="200" height="200" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100"/>
</svg>

---

## Group

* A `<g>` element is a *group* of elements. We can apply properties across the group, for example styles or transforms

```svg
<svg width="200" height="200" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <g stroke="blue" fill="none">
    <circle cx="100" cy="100" r="50" stroke-width="5"/>
    <circle cx="120" cy="100" r="50" stroke-width="5"/>
  </g>
</svg>
```

<svg width="200" height="200" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <g stroke="blue" fill="none">
    <circle cx="100" cy="100" r="50" stroke-width="5"/>
    <circle cx="120" cy="100" r="50" stroke-width="5"/>
  </g>
</svg>

---

## Transforms

* Groups can also have a transform -- this is like canvas's translate and rotate, but the *transformation matrix* is specified

```svg
<svg width="200" height="200" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="50" stroke-width="5"/>
  <g stroke="blue" fill="none" transform="translate(30)">
    <circle cx="100" cy="100" r="50" stroke-width="5"/>
  </g>
</svg>
```

<svg width="200" height="200" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="50" stroke-width="5"/>
  <g stroke="blue" fill="none" transform="translate(30)">
    <circle cx="100" cy="100" r="50" stroke-width="5"/>
  </g>
</svg>

---

## Paths

* If you want to draw a graph (manually, rather than with a charting tool), SVG's `path` element is useful

* `m`=Move; `l`=line to; `c`=Cubic Bezier curve to; `z`=Close path  
  lowercase = relative coordinates; uppercase = absolute coordinates

```svg
<svg width="500" height="200" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <g stroke="blue" stroke-width="5" fill="none">
    <path d="M0,50 l50,30 l50,-30 l50,40 c 50,-50 100,50 150,-70 z" />
  </g>
</svg>
```

<svg width="500" height="200" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <g stroke="blue" stroke-width="5" fill="none">
    <path d="M0,50 l50,30 l50,-30 l50,40 c 50,-50 100,50 150,-70 Z" />
  </g>
</svg>

---

## When to use SVG

* In SVG, each element in the drawing is an *element*.



* This means it can be styled with CSS, and event listeners can be attached to individual elements



* This can involve some overhead for the browser, so SVGs with a large number of elements might not be performant

---

## Over to you...

* Again, there are many more elements, including animations, but this will get you started.

* Let's look at a [small example](svg/index.html)...