# Prototype Inheritance

ES5 used *prototype inheritance*: objects inheriting from objects rather than from classes.

Even though ES6 introduced a class syntax, this is still useful to know because:

* You may come across old code

* ECMAScript maintains backwards compatibility fairly strongly. Not only do ES5 techniques still work, 
  the ES6 class syntax is implemented on top of prototype inheritance.

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