### Cascading Style Sheets (CSS)

* Allow you to describe how to set style properties on an element



* Two parts: a *selector* and the *properties* to set.



```css
div {
    color: red;
}
```



We're not going to look at all the properties or all the selectors. This is just a refresher.

---

## Class selector

```html
<p class="byclass">This goes red</p>
```

```css
<style>
    .byclass {
        color: red;
    }
</style>

```

<p class="byclass">This goes red</p>
<style>
    .byclass {
        color: red;
    }
</style>


---

## Multiple classes

Can select on multiple classes at once. For example, let's take a look at an [example with an SVG](svg/index.html)

```css
.segment {
    stroke: hsl(1, 0%, 70%);
    stroke-width: 50;
    stroke-linecap: round;
    cursor: pointer;
}
.segment.on {
    stroke: hsl(1, 100%, 70%);
}
```

This always matches the segments, but also allows us to toggle them on and off by adding and removing a class.

---

## id selector

We can select an element that has a particular id

```html
<p id="thisone">This goes red</p>
```

```css
<style>
    #thisone {
        color: red;
    }
</style>

```

<p id="thisone">This goes red</p>
<style>
    #thisone {
        color: red;
    }
</style>

---

## descendent selector

To select descendents, put a space before the next selector

```html
<div id="desc">
    <ul>
        <li>Not red</li>
        <li class="red">This goes red</li>
    </ul>
</div>
```

```css
<style>
    #desc .red {
        color: red;
    }
</style>

```

<div id="desc">
    <ul>
        <li>Not red</li>
        <li class="red">This goes red</li>
    </ul>
</div>
<style>
    #desc .red {
        color: red;
    }
</style>

---

### Pseudo classes

Some actions can trigger a pseudo class. For example, hovering the mouse gives an element the `hover` pseudoclass.



```html
<p class="onhover">This goes red when hovered</p>
```

```css
<style>
    .onhover:hover {
        color: red;
    }
</style>

```

<p class="onhover">This goes red when hovered</p>
<style>
    .onhover:hover {
        color: red;
    }
</style>

---

### nth child

If you want striped tables, use the nth-child pseudoclass



```html
<table class="striped">
  <tr><td>1</td><td>2</td></tr>
  <tr><td>1</td><td>2</td></tr>
  <tr><td>1</td><td>2</td></tr>
</table>
```



```css
<style>
    .striped tr:nth-child(2n+1) {
        background-color: #ddf;
    }
</style>
```



<table class="striped">
  <tr><td>1</td><td>2</td></tr>
  <tr><td>1</td><td>2</td></tr>
  <tr><td>1</td><td>2</td></tr>
</table>

<style>
    .striped tr:nth-child(2n+1) {
        background-color: #ddf;
    }
</style>

---

### Don't repeat yourself (DRY)

Until recently, CSS didn't have a way of declaring variables.

So, for example, if you have a corporate colour scheme that needs replicating across `h1`, `th`, and other elements, you might find yourself repeating the same color values a lot.

It was also thought useful to be able to use mixins, nesting, functions, or other ways to enhance the language.



And you might want to *write* your CSS in multiple files, to keep your code organised, but have the stylesheets *loaded* as a single file to keep latency down.



**Introducing ... *preprocessors***

---

### CSS Preprocessors

Three of the popular ones are:

* LessCSS ([lesscss.org](http://lesscss.org))

* SASS ([sass-lang.com](http://sass-lang.com))

* Stylus ([stylus-lang.com](http://stylus-lang.com))

These let you write in a CSS-like syntax, but with added features. The preprocessor then produces the final CSS for you to include in the page.

---

### Less CSS

Install it using `npm`.

* Node.js is a server-side implementation of JavaScript.



* NPM is the "Node Package Manager", and has become the *de facto* standard for how to install a lot of web tools



Installing less

```sh
npm i less --save-dev
```



Using less

```sh
lessc myfile.less myfile.css
```

---

### Less CSS features

These examples come from their docs



Variables:

```less
// Variables
@link-color:        #428bca; // sea blue
@link-color-hover:  darken(@link-color, 10%);
```



String interpolation

```less
// Variables
@images: "../img";

// Usage
body {
  color: #444;
  background: url("@{images}/white-sand.png");
}
```

---

### Less CSS

Import:

```less
// Variables
@themes: "../../src/themes";

// Usage
@import "@{themes}/tidal-wave.less";
```

---

## SASS

SASS is probably more popular than less. It used to be written in Ruby (required a separate install) but they've ported it over to Dart now.

We'll install the pure JavaScript version



```sh
npm install sass --save-dev
```

---

## SCSS

SASS has two formats (SASS and SCSS). We'll use SCSS for now.

These examples come from their docs



As with less, scss has variables:

```scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

---

### SCSS

Import

```scss
@import 'reset';

body {
  font: 100% Helvetica, sans-serif;
  background-color: #efefef;
}
```

---

### SCSS

Mixins

```scss
@mixin transform($property) {
  -webkit-transform: $property;
      -ms-transform: $property;
          transform: $property;
}

.box { @include transform(rotate(30deg)); }
```



```css
.box {
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
}
```

---

### SCSS

Extend / inherit:

```scss
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.success {
  @extend %message-shared;
  border-color: green;
}
```



```css
.message, .success {
  border: 1px solid #cccccc;
  padding: 10px;
  color: #333;
}

.success {
  border-color: green;
}
```

---

### Demo




---

class: center, middle

# Coming up

If we can preprocess stylesheets, what if we do the same to scripts?
