### React

React is a very popular (probably the most popular) front end framework produced by the engineering team at Facebook.

It is also fast-moving, so these notes might not contain the latest features.
These notes are written for **React 14** and a little of **React 16**.

React is currently up to version **18**, which has some notable differences:

* React *hooks* were introduced in React 16.8. These let you define stateful components as functions, by calling 
  a *hook* from inside your function to get the component's state.  
  Yes, that means they changed how you should define components *twice in quick succession*. 
  In React 16, they pushed users towards using classes, but by React 16.8 they'd shifted to functions with hooks!

* React 18 introduces a concurrent renderer. 

Both of these changes are conceptually ... complex ... so maybe it's best to start with React 16 anyway.

---

### The browser has a document model, not a widget model

* HTML has low-level tags like `<p>`, `<div>`, `<h1>` etc

* HTML doesn't have 

  `<userprofile_widget user="myuser" />`
  
  `<calendar year="2015" view="month" month="aug" />`
  
* Manipulating lots of low-level elements makes for unreadable, messy code
 
* Most modern front-end frameworks introduce a component model -- how you can declare what that calendar widget should look like

---

### "Traditional" frameworks

* Keep application state in JavaScript data

* Bind the data to UI elements on the page. Traditionally, these components controlled actual DOM elements

  * two-directional linking -- listen to the model, and listen to the DOM elements

  * Heavy: can be a lot of listeners

  * An update to one component could trigger an update to some data, triggering an update to another component.

  * Each change to the browser DOM is slow (causes it to need to re-do its layout)

  * The logic of what is updating when can be hard to follow

---

### Imagine it was 1994...

* Ordinary GETs and POSTs don't try to *modify* the displayed HTML. They just return a new page.

* From a developer's perspective this is very simple

    * Don't need to write code to *update* HTML, just code to *produce* HTML

* What if we did that in JavaScript?

---

### React.js

*"The V in MVC"*. 

* Components know how to produce HTML, not how to update it. *Declarative* UI.

* Components can keep local (JavaScript) state, that can be modified if they want.

* Every time anything changes, just produce fresh HTML for the *whole page*.

---

### React.js

* But actually re-rendering the whole page would lose state

    * scroll position
    * cursor position in input fields
    * position in a video
    * etc

---

### Virtual DOM

* Components *don't* render to the real DOM &mdash; your component never updates the real page.



* Instead, they create elements in a "virtual DOM". As these are just JavaScript objects, they are very fast to produce.



* On each update, your application produces a new virtual DOM for the whole page -- the target state you want the page to be in.



* React.js internally diffs the virtual DOM with what is displayed, and works out what changes it needs to make to the displayed DOM

---

### React.js

* Your code never has to worry about updating HTML, just producing it

* But the HTML of the page is updated to match what you want (React.js handles this for you) 

* Transient state (eg, scroll position) is preseved

* Everything is acceptably fast (60fps even on poor browsers)

---

### Getting started

* For react.js, we just need to include the Javascript in our page

```html
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
```

---

### An example

We keep some data in JavaScript

```js
theName = "Algernon"
```

---

### A React example (for versions before v16)

Let's create a React component to say hello:

```js
var HelloMessage = React.createClass({displayName: "HelloMessage",
  render: function() {
    return React.createElement("div", null, "Hello ", this.props.name);
  }
});
```

---

### Let's update that for React 16

React.js from version 16 requires us to use ES6 classes (similar to TypeScript classes)

```js
class HelloMessage extends React.Component {
    render() {
        return React.createElement("div", null, "Hello ", this.props.name);
    }
}
```

---

### An example

Let's render that hello

```js
let mountNode = document.querySelector("#renderhere")

ReactDOM.render(
  ReactDOM.createElement(HelloMessage, {name: "Algernon"}),
  mountNode
);
```

Result:

```html
<div>Hello Algernon</div>
```

---

### But that render method's a bit ugly...

```js
class HelloMessage extends React.Component {
    render() { 
        return React.createElement("div", null, "Hello ", this.props.name);
    }
}
```

---

### JSX

* Facebook's own syntax that lets you write *render* methods that look like HTML

```jsx
let theName = "Algernon"

class HelloMessage extends React.Component {
    render() {
        return <div>Hello {this.props.name}</div>;
    }
}

ReactDOM.render(<HelloMessage name={theName} />, mountNode);
```

---

### Using JSX via Babel (not for production)

Babel compiles scripts in your browser to JavaScript, for ES6 and JSX



* Include it in your page

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```



* Give your JSX script the appropriate type

```html
<script type="text/babel" src="..." />
```

Babel will do the conversion in the browser
  


* But that means you can't minify your JSX!

---

### Alternative way using a preprocessor

We can get a preprocessor to compile our JSX.

For JSX and ES6:

```sh
npm install babel-cli@6 babel-preset-react-app@3
```



TypeScript already includes support for TSX; we just need to tell typescript to target React for its output in `tsconfig.json`

```js
"jsx": "react"
```

and install React's types and library

```sh
npm install --save react react-dom @types/react @types/react-dom
```

---

### Practical React.js

* Start by identifying your components

* trivial example -- the gibberish list

  * a component that knows how to show a gibberish element

  * another component for the list

---

### Props, state...

* "Props" is a JavaScript object containing properties -- things that get passed into the component

    * eg, `<HelloMessage name={theName} />`

* "State" is for transient stuff -- eg, the user is editing text in a form field, and the form component needs to remember it 

---

class: center, middle

## A little example (using React 0.14)

---

### Imagine a TODO list

Suppose we have some items in javascript

```js
items = [ "foo" ]
```

---

### Imagine a TODO list

Just showing a TODO item doesn't require state, only props

```js
var TodoItem = React.createClass({
  render: function() {
    return <ul>{this.props.item}</ul>;
  }
});
```

---

### Imagine a TODO list

Just showing a list of TODO items also doesn't require state, only props

```js
var TodoList = React.createClass({
  render: function() {
    return <ul>{this.props.items.map(function(item) { 
      return <TodoItem item={item} />
    })}</ul>;
  }
});
```
---

### Imagine a TODO list

A widget adding items needs some state (for the text being typed in the input field)

---

```js
var TodoApp = React.createClass({
  getInitialState: function() {
    return {text : ""};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    items = items.concat([this.state.text]);
    this.forceUpdate();
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (items.length + 1)}</button>
        </form>
      </div>
    );
  }
});
```