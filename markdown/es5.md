### JavaScript

* Designed by Brendan Eich at Netscape; called "JavaScript" for marketing purposes

* Standardised as *ECMA Script*. (Versions are sometimes called "ES3", "ES5", "ES6", etc.)

* Still under development -- efforts to make it more traditional OO language

* For a long time, browsers only supported **ES5**. Most modern browsers now support newer versions, e.g. **ES2016**.

* Single threaded, imperative

These notes go through the language very fast, as many students will already be familiar with it. I have separately posted links to tutorials for students who might be newer to JavaScript programming.

These notes start with **ES5**. The web has been around since 1993 and there is a lot of legacy code that browsers maintain
backwards compatibility with. Newer ES features are often still implemented in ways so that ES5 can still work.

If you're writing a modern app, though, you'd start with ES6+

---

### Dynamically & weakly typed

Let's define two variables

```js
var a = "2"
var b = "2"
```

No type declaration for variables, just `var`

Because it's weakly typed, what would this produce?

```js
a / b
```



```js
1
```

`a` and `b` are implicitly converted to numbers because we tried to divide them

---

### Dynamically & weakly typed

A puzzler. What would this evaluate to?

```js
17 + ("apples" != "oranges") + "foo"
```

```js
"18foo"
```

`"apples"` and `"oranges"` are not equal, so this evaluates to `true`

`17 + true` causes `true` to be cast to `1`

`18 + "foo"` causes `18` to be cast to `"18"`

---

### Dynamically & weakly typed

**Moral of the story**:

It is very easy to get your code in a tangle in JavaScript, and just have *weird* results, rather than a compiler error or exception you can debug.

**You** need to be very disciplined in how you code JavaScript, because there's no compiler to enforce the discipline for you.

---

### Curly brace language

ES5 is a curly-brace language, with many features common to C and Java

* `if`
* C-style `for` loops
* `while`
* `switch`
* `try` and `catch`

---

### If

```js
var a = 1
if (a > 0) {
  console.log("a bigger than zero")
} else {
  console.log("a not bigger than zero)
}
```

---

### Note on comparators

Because JavaScript is weakly typed, it ends up with *three* equals

`=` is assignment, as in 

```js
var a = 1
```

`==` is equality, allowing type coercions, as in

```js
1 == "1" // true!
1 != "1" // false
```

`===` is equality and a check for the types beign identical, as in 

```js
1 !== "1" // true
1 === "1" // false
```

---

### Switch

Switch compares an expression with a set of values, and executes the first match. It *falls through* case labels until it reaches a `break` or `return`.

```js
switch(new Date().getDay()) {
  case 0:
    console.log("Sunday")
    break;
  case 6:
    console.log("Saturday")
    break;
  default:
    console.log("A weekday")
}
```

---

### Do / While

`do`...`while` runs the loop at least once, running the test at the end. 

```js
do {
  var rand = Math.random()
  console.log(rand)
} while (rand < 0.75)
```

```js
0.40560043846150706
0.027901419710521624
0.25306411328320255
0.05565414698009219
0.08795145997322007
0.8026764147095617
```

Notice the last value is >= 0.75

---

### While

while runs the test first. In this case, we've put an assignment in the test too.

```js
var rand
while((rand = Math.random()) < 0.75) {
  console.log(rand)
}
```

```js
0.22167650414274442
0.2922727063692738
0.4191189164817928
```

Notice the last value is < 0.75

---

### C-style for loops

```js
for (var a = 0; a < 5; a++) {
  console.log(a)
}
```

```js
0
1
2
3
4
```

---

### Exceptions

Exceptions are handled in a fairly Java-like manner, except that they are untyped

```js
try {
  console.log(null.size())
} catch (err) {
  console.log(err.message)
}
```

```
Cannot read property 'size' of null
```

---

### Declaring a named function

```js
function takesTwoArgs(a, b) {
  console.log("a is " + a)
  console.log("b is " + b)
}

takesTwoArgs(1)
```

This logs to the console:

```js
a is 1
b is undefined
```

It is comparatively common for JavaScript frameworks to take advantage of this -- to declare optional parameters you just don't have to pass.

---

### Functions are values

```js
var f = function(i) { return i + 1 }
f(1)
```

produces:

```js
2
```

What would this do?

```js
> f("1")
```



```js
"11"
```

It's dynamically typed, and `+` on strings is append.

---

### Functions are values

A puzzler &mdash; what would this produce?

```js
var f = function(i) { return i + 1 }
"a" + f
```



```js
"afunction (i) { return i + 1;}"
```



What about if we did it this way?

```js
function f(i) { return i + 1 }
"a" + f
```



```js
"afunction (i) { return i + 1;}"
```

---

### Functions are values

**Moral of the story:**

Functions can be values (you can set a variable to a function)

It's dynamically typed all the way -- including function arguments, and even functions themselves

---

### ES5 has six "language" types

* **Undefined**: Has exactly one value (`undefined`). Any variable that has not been assigned a value has this value.

* **Null**: Has exactly one value (`null`)

* **Boolean**: Has `true` and `false` as values

* **String**: Sequences of UTF-16 characters

* **Number**: A double-precision floating point number. Note that JavaScript has no integer type!

* **Object**: A collection of properties.

Note that `null == undefined` is true, but `null === undefined` is false.

---

### Objects are hashes / maps

We can declare an object using curly braces:

```js
var myobj = { a: "1", b: "2" }
```

We can access a field using a dot:

```js
myobj.a
```

```js
"1"
```

or using square brackes:

```js
myobj["a"]
```

```js
"1"
```

---

### Like hashes / maps, they can be given new keys

```js
var myobj = { a: "1", b: "2" }
myobj["hello"] = 3
myobj.hello
```

```js
3
```

---

### Keys can have spaces

```js
var myobj = { a: "1", b: "2" }
myobj["hello with spaces in it"] = 3
myobj["hello with spaces in it"]
```

```js
3
```

or

```js
var myobj2 = { "hello with spaces in it": 3 }
myobj2["hello with spaces in it"]
```

```js
3
```

---

### Arrays are objects too

Arrays are also objects, creating the curiosity that we can set non-numeric values

```js
var array = [1, 2, 3, 4]
array["text"] = 99
console.log(array.text)
```

```
99
```

---

### What is a function?

A puzzler -- so if the only six languages types are `undefined`, `null`, `boolean`, `string`, `number`, and `object`, which of those types is `f` here?

```js
var f = function(a) { return a + 2 }
```

It's an object. Though if you type `typeof(f)` it will say

```js
'function'
```

Functions are special kinds of object. This means we can assign *properties* to them!

```js
function echo(s) { console.log(s) }
echo.hello = "hello"
echo(echo.hello)
```

```js
"hello"
```

---

### Scope of variables

Variables in ES5 have one of two scopes: *global* or *function*.

Anything declared outside a function is global

```js
var thisIsGlobal = 5
```



Anything declared in a function is local to that function.

```js
val f = function (x) {
  var thisIsLocal = x * 2
}

thisIsLocal // undefined
```

---

### ES5 has no block scope

Unlike most languages, variables defined in a block (between curly braces) still have the scope of the *entire function*.

```js
var even = false
var f = function (x) {
  if (x % 2 == 0) {
    var even = true
  }

  return even // which 'even' does this refer to?
}
```



Let's try it:

```js
console.log(f(2)) // true
console.log(f(3)) // undefined
```

---

### `let` -- block scope from ES6

ECMAScript 6 introduced the `let` keyword, for variables with block scope.

This was backported to most browsers even before they properly supported ES6, so even ES5 code will often use `let`.

```js
let even = false
let f = function (x) {
  if (x % 2 == 0) {
    let even = true
  }

  return even // which 'even' does this refer to?
}
```

Let's try it:

```js
console.log(f(2)) // false
console.log(f(3)) // false
```

---

### ES5 had no explicit module system

* Pages use lots of scripts

* Different scripts might re-use variable names. eg, many scripts use `$` as a short variable name

* In times gone by, this was a problem -- variables from different scripts would *collide*

For many years, the solution was to use function scope...

---

### Functions can be anonymous

```js
var module = (function(s) { 
  var $ = "hello"  
  
  console.log($) 
})()
```

This has created a function, and immediately applied it. The variable `$` has function scope, and is independent of any global `$`.

---

### Anonymous functions as a module hack in ES5

If we want our module to *export* a variable to the global scope, we can get it to make an assignment on the global `window` object:

```js
var module = (function(s) { 
  var $ = "hello"

  // Exporting this function by putting it onto the global "window" object
  window.logGlobal = function() { 
    console.log($)
  }
})()
```

Let's call that, showing that `$` is independent:

```js
var $ = "goodbye"
logGlobal()
```

```js
hello
```

---

### Strict mode

ES3 had a habit of failing silently for a number of errors. For example, what would this do?

```js
var a = 1
a.name = "boo"
console.log(a.name)
```

```js
undefined
```

a is 1, and 1 is a number not an Object. So it failed silently to set the name on it.

But let's tell JavaScript to use strict mode...

---

### Strict mode

To use strict mode, put this at the very top of each JavaScript file:

```js
"use strict";
```

And note that it is a string, followed by a semicolon.



```js
"use strict";

var a = 1
a.name = "boo"
a.name
```



```
TypeError: can't assign to property "name" on 1: not an object
```



There are several more errors that strict mode makes ES5 strict about. (But I'll leave looking them up to you.)

---

### Object-orientation

JavaScript is object-oriented but uses a unique kind of inheritance called *prototype inheritance*. 

We can define an object constructor just by writing a function that modifies `this`:

```js
function Circle(x, y) {
  this.x = x
  this.y = y
}
```



Now we can create circles using the `new` keyword:

```js
var c = new Circle(1, 2)
console.log(c.x)
```



```js
1
```


---

class: center, middle

# Prototype Inheritance

#### (How object-orientation works in ES5)

---

### Defining a constructor

JavaScript is object-oriented but uses a unique kind of inheritance called *prototype inheritance*.

We can define an object constructor just by writing a function that modifies `this`:

```js
function Circle(x, y, r) {
  this.x = x
  this.y = y
  this.r = r
}
```



Now we can create circles using the `new` keyword:

```js
var c = new Circle(1, 2)
```



And a circle's x property has been set by the constructor:

```js
console.log(c.x)
```

```js
1
```

---

### Creating methods

We could just create fields that are functions inside the constructor:



```js
function Circle(x, y, r) {
  this.x = x
  this.y = y
  this.r = r

  // returns whether a point (x, y) is inside this circle
  this.contains = function(x, y) {
      return Math.sqrt(
          Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)
      ) < r
  }
}
```



```js
var c = new Circle(1, 2, 3)
c.contains(3, 2)
```



```
true
```

---

### Putting methods on the prototype

However, JavaScript has another way. Although there is no *class* called Circle, every Circle created shares a *prototype object*.

If we add fields or methods to this prototype object, they become available on all circles. 

Let's modify the prototype, and watch as a circumference method becomes available even on the circles we've already created.



```js
Circle.prototype.circumference = function() {
    return Math.PI * 2 * this.r
}
```



```js
console.log(c.circumference())
```



```
18.84955592153876
```

---

### An easy mistake to make

Note that if we call `Circle` without the `new` keyword, we've just called a function.



```js
var notACircle = Circle(1, 2, 3) // this hasn't created an object!
```



```js
console.log(notACircle.x)
```



```
TypeError: Cannot read property 'x' of undefined
```



But worse, our call to `Circle` has modified properties on `this`:

```js
console.log(this.x)
```



```
3
```



This can make using objects and inheritance very error-prone in ES5.