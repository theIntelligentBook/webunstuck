### Why?

* JavaScript has some nice characteristics
  - higher order functions (can pass functions as values)
  - runs almost anywhere
  - libraries for almost anything 

* But it's weakly, dynamically typed 

  - can pass the wrong type and not know it
  - tools can't easily tell you what functions are available on a variable
  - no modules (have to use an odd pattern to make it work)
  - prototype inheritance is alien to many deveopers

---

### TypeScript

* Compiles to JavaScript

  - runs in the browser
  - can call into JavaScript libraries
  - optionally, can give them type definitions (needs a separate file)
  - can call your code from JavaScript libraries

* Makes the language friendlier for larger programs

---

### Optional static typing

* Can add type annotations with `: type` notation

* Can also infer types for immediately declared variables

```ts
// Declare our variables
let canvas = document.getElementById("canvas"),
    width = canvas.width,
    height = canvas.height,
    player = new Player(width / 2 + 100, height / 2),
    speed = 30,
    thrustConst = 10,
    asteroids: Array<Body> = [player],
    well = new Well(20, width/2, height/2, asteroids),
    xSpeedHistory:Array<number> = [1, 3, 4, 5, 6, 7],
    ySpeedHistory:Array<number> = [],
    historyLength = 1000;
```

---

### Interfaces

* Can declare Java-like interfaces -- contracts that say what methods and fields are available

```ts
interface Drawable {
    draw(canvas:HTMLCanvasElement);
}
```

---

### Class-like inheritance

* Can declare and implement classes

* Generally "just works", but remember this is running on JavaScript -- it compiles to be implemented on top of prototype-based inheritance

```ts
class Body implements Drawable {
    x: number = 0;
    y: number = 0;

    draw(canvas:HTMLCanvasElement) {
      // etc
```

```ts
class Asteroid extends Body {
    radius: number = 10;
    //etc
```

---

### Class members are public by default

```ts
class Asteroid extends Body {
    radius: number = 10;

    draw(canvas) {
    // ...
```

---

### Constructor arguments can be made into fields

```ts
class Player extends Body {

    // ...

    constructor(public x: number, public y: number) {
      super();
      this.name = "The player";
    }

```



* Note the call to `super()`. If you write a constructor and your class extends another class, you need to do that explicitly.

---

### Arrow functions

Arrow functions are introduced in ES6, and are also available in TypeScript.



If it's a one-line function there's no need for a `return` statment

```ts
let add = (a,b) => a + b;
```



But for functions with blocks, there is

```ts
let add = (a,b) => {
    console.log("called");
    a + b;
}
```

.

---

### Installing

* TypeScript compiler is an npm (Node Package Manager) module

```sh
npm install -g typescript
```

```sh
npm install --save-dev typescript
```

* You can then compile with `tsc`. `--watch` will watch for changes

```sh
tsc asteroids.ts --watch
```

```sh
node_modules/typescript/bin/tsc asteroids.ts --watch
```

---

### Project file

We can also create a file `tsconfig.json` that will describe a *project* to compile



```sh
node_modules/typescript/bin/tsc asteroids.ts --init
```



```js
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": false,
        "sourceMap": false
    },
    "exclude": [
        "node_modules"
    ]
}
```

---

### Some elements in tsConfig



* In tsconfig.json, set `sourceMap` to `true` and source-maps will be generated.



* If you set `noImplicitAny` to true, TypeScript will require a type annotation whenever it cannot infer the type (changes from optional static typing to compulsory typing)



* `module` relates to how modules are loaded. This defaults to CommonJS which is how Node.js but not the browser loads modules. You can switch it to `require