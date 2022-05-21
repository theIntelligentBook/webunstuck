### HTML

* HTML is **Hypertext Markup Language**. It was originally designed for static document with links in -- in 1993, it couldn't even contain embedded images.

* The current version of HTML is HTML5.

* We're not going to go into all the different kinds of tags.

---

### A basic HTML5 document

```html
<!DOCTYPE html>
<html>
  <title>My document</title>

  <h1 class="doc">A big header</h1>
  <p> Here's a list:</p>
  <ul>
      <li>This text has some <i>italics</i></li>
      <li>And this text has some <strong>bold text</strong></li>
  </ul>

  <br />
</html>
```

1. `<!DOCTYPE html>` tells the browser to use HTML version 5.
2. *Elements* go in angle-brackets, eg `<h1>` and are closed with a matching tag, eg `</h1>`
3. Elements can have *attributes*. eg. the `class` attribute on the `<h1>` element
4. Elements can have children, including a mix of text nodes and other elements.
5. I haven't bothered with `<head>` and `<body>` tags. They're not required.

---

### Loading scripts

In this unit, we're making web applications rather than web pages. So one of the first things we want to be able to do is to load some JavaScript.

We can do that with a script tag. By default, the browser will assume a script is some JavaScript, and will execute it *immediately*.



```html
<!DOCTYPE html>
<html>
  <p>Here is some text</p>

  <script>
      document.write("This was executed immediately")
  </script>

  <p>Here is some more text</p>
</html>
```



If we inspect the page's DOM (document object model), we'll see a text node got inserted between the two paragraph tags.

---

### Creating nodes using the DOM API

Instead, let's create a paragraph, and make its text red

```html
<!DOCTYPE html>
<html>
  <p>Here is some text</p>

  <script>
      var el = document.createElement("p")
      el.setAttribute("style", "color: red;")
      var text = document.createTextNode("This text was added")
      el.appendChild(text)
      document.body.append(el)
  </script>

  <p>Here is some more text</p>
</html>
```

Now, rather than writing text to be consumed by the HTML parser, we are interacting with the DOM API by calling methods on the `document` global object.

Again, we're not going to look at all the methods that are available on the DOM API. Suffice it to say, there are methods for creating nodes, methods for finding nodes, and methods for modifying nodes. It's an API that lets us programmatically alter the DOM.

---

### Move the script into its own file

Let's move the script into its own file, so the HTML becomes:



```html
<!DOCTYPE html>
<html>
  <p>Here is some text</p>
  <script src="run_me.js" ></script>
  <p>Here is some more text</p>
</html>
```



And the JavaScript contains:



```js
var el = document.createElement("p")
el.setAttribute("style", "color: red;")
var text = document.createTextNode("This text was added")
el.appendChild(text)
document.body.append(el)  
```



It still does the same thing.

Notice that the paragraph is rendering between the lines of text from the HTML. This means the browser has to *stop parsing* when it sees the script tag, load the script, and then run the script, before it can carry on parsing the HTML.

---

### Defer and Async

To load the script, the browser had to make another network request. Even assuming no processing delays, the speed of light means that for a server on the other side of the world that request could take 200ms. Our page could become slow.

Let's tell the browser to carry on parsing and run the script at the end:



```html
<!DOCTYPE html>
<html>
  <p>Here is some text</p>
  <script src="run_me.js" defer="defer"></script>
  <p>Here is some more text</p>
</html>
```



Or to load and run it asynchronously:

```html
<!DOCTYPE html>
<html>
  <p>Here is some text</p>
  <script src="run_me.js" async="async"></script>
  <p>Here is some more text</p>
</html>
```

---

### Linking the DOM to code

So far, we've seen altering the DOM from code, but we'll also need to go the other way &mdash; call our code from actions the user makes on the HTML.



1. Use event attributes in the HTML, eg

    ```js
    <button onclick="alert('hello')">Alert</button>
    ```



2. Attach an event listener via the DOM api, eg

    ```js
    let button = document.createElement("button")
    button.addEventListener("mousedown", handler)
    ```



Generally, I recommend the latter as it's easier to control. With the only caveat that it can be hard to *remove* a listener from a DOM node, due to the way equality works with anonymous functions

(But normally, whatever framework we use will handle adding and removing listeners for us)

---

### Preferring `let` over `var`

Putting handlers on buttons is one of the places you are most likely to encounter the difference between `let` and `var` scoping.

Let's create three buttons from a for loop:

```html
<!DOCTYPE html>
<html>
  <div id="renderhere"></div>
  <script src="demo.js"></script>
</html>
```



```js
var addTo = document.getElementById("renderhere")
for (var i = 0; i < 3; i++) {
  var el = document.createElement("button")
  var tn = document.createTextNode("button " + i)
  el.appendChild(tn)
  
  el.addEventListener("click", function(evt) {
    window.alert(i)
  })
  addTo.appendChild(el)
}
```

---

### Preferring `let` over `var`

What happened - 

```js
var addTo = document.getElementById("renderhere")
for (var i = 0; i < 3; i++) {
  var el = document.createElement("button")
  var tn = document.createTextNode("button " + i)
  el.appendChild(tn)
  
  el.addEventListener("click", function(evt) {
    window.alert(i)
  })
  addTo.appendChild(el)
}
```

`var i` here is *global*. When our event listener closed over the variable, it closed over the global variable, and so all three buttons referenced the same `i` variable (which at the end of the loop was 3)

---

### Function scope would not help

Let's put that code into an anonymous function

```js
(function() {
  var addTo = document.getElementById("renderhere")
  for (var i = 0; i < 3; i++) {
    var el = document.createElement("button")
    var tn = document.createTextNode("button " + i)
    el.appendChild(tn)
  
    el.addEventListener("click", function(evt) {
     window.alert(i)
    })
    addTo.appendChild(el)
  }
})
```

We still get 3 all three times. `i` now has *function* scope, but that still means the event listeners for all three buttons reference the same variable `i`

---

### Block scope (`let`) solves the problem

Let's change `var` to `let` in the for loop.

```js
(function() {
  var addTo = document.getElementById("renderhere")
  for (let i = 0; i < 3; i++) {
    var el = document.createElement("button")
    var tn = document.createTextNode("button " + i)
    el.appendChild(tn)
  
    el.addEventListener("click", function(evt) {
     window.alert(i)
    })
    addTo.appendChild(el)
  }
})
```

Each time through the loop, it is a *different* variable `i`, and so now all three event listeners close over the value from their run through the loop.