## Vue.js

If you are unsure which client-side framework to use, I recommend Vue.js as it is perhaps the quickest to learn (least conceptual overhead).

**Note**: This deck currently covers Vue 2. Vue 3 became the default version on Vue's documentation site in Feb 2022.
Vue's migration guide is [here](https://v3-migration.vuejs.org/breaking-changes/)

---

### Ethos

* Approachable

* Versatile

* Performant (small JS size and fast virtual DOM)

---

### Virtual DOM?

We'll discuss what a "Virtual DOM" is more when we talk about React -- it is the framework that introduced the idea.

For the moment, suffice it to say that we will tell Vue what components and tags we want, but Vue will deal with maintaining the real components in the page for us.

---

### Vue.js example



First, we need to load Vue itself

```html
<script src="https://unpkg.com/vue@2"></script>
```



Then we need to describe a *template* for what we want Vue to render

```html
<div id="app">
  {{ message }}
</div>
```



Then we're going to need to instantiate our Vue app

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

---

### Putting that all together

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="index.css">
        <script src="https://unpkg.com/vue@2"></script>
    </head>
    <body>
        
        <div id="app">
            {{ message }}
        </div>
        
        <script>
        let app = new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue!'
            }
        });
        </script>
    </body>
</html>
```

---

### What we just saw

* One-way binding of text using handlebars notation
  `{{ message }}`

* Creation of the app by calling
  `new Vue()`

* Passing the element selector for where to render the app
  `el: '#app'`

* Passing data to render as an ordinary JavaScript Object
  `data: { message: 'Hello Vue!' }`

---

### That was small

As our code gets bigger, we're going to want to introduce reusable *components*. These teach Vue new tags.

[Game of life example](vuejs/)



Let's declare a component `lifecell` that will teach Vue the `<lifecell>` tag:

```js
Vue.component('lifecell', {
    props: ['lifecell'],
    template: '<span>{{ lifecell ? "#" : "_" }}</span>'
})
```

* This has declared a *property* on the tag called `lifecell`

* The content of the span is one-way bound to an expression using that property



* We could call that from within a Vue template like this:

  ```html
  <lifecell lifecell="true"></lifecell>
  ```

---

### Loops

Now let's declare a row of Conway's game of life as a `lifeline`. It's made up of `lifecells`, so we need as many cells as the row's array contains



```js
Vue.component('lifeline', {
    props: ['lifeline'],
    template: '<span><lifecell v-for="l in lifeline" v-bind:lifecell="l"></lifecell></span>'
})
```



* `v-for` directs Vue to create one `lifecell` for each entry in the `lifeline` array property

* `v-bind` binds the value of the `lifecell` parameter to the value of the element in the array

* Note that our component has to have *one* element it produces (the surrounding `<span>`) -- we can't just produce an unwrapped array of `lifecell`s

---

### Let's do that again

`lifeline` has defined a row. Let's now defined a grid as an array of lines. And let's create a `lifegrid` component



```js
Vue.component('lifegrid', {
    props: ['lifegrid'],
    template: '<div><div v-for="l in lifegrid"><lifeline v-bind:lifeline="l"></lifeline></div></div>'
})
```



Now we can declare a template for our game:

```html
<div id="app">
    <div class="mono">
        <lifegrid v-bind:lifegrid="lifegrid"></lifegrid>
    </div>
</div>
```

---

### Initialising the game

Now we have our *components* and our *templates*, we can initialise the game



```js
var game = {
    moves: 0,
    lifegrid: window.getGrid()  // Array<Array<boolean>>
}
```

```js
new Vue({
  el: '#app',
  data: game
})
```

---

### Going dynamic

So far, we've just declared templates and components. This is relatively similar across most front-end frameworks. The more interesting part about Vue is how it handles dynamic changes. 

Here's our step game function:

```js
var gameStep = function() {
    game.moves = game.moves + 1;
    game.lifegrid = window.step();
}
```

We've just updated one of the fields on the `game` object that Vue uses as it's data.



Where's the call to render?



***There isn't one &mdash; and yet the game updates!***

---

### How Vue.js does binding

Vue.js's approach to data-binding is that *it alters your data objects* to wire in listeners. This takes advantage of JS being dynamic and being able to alter objects' prototype objects at runtime.



1. Modifies your model &mdash; changes fields into ES5 getters and setters

2. On render, records which fields were "got"

3. Creates a watcher that is notified in the setters for those fields

4. Whenever the watcher is triggered, the component is re-rendered

---

### Watcher caveats

There are some things Vue.js cannot watch because it cannot rewire them:

* Fields added or deleted

* Direct array updates, eg

  ```js
  myArr[5] = 4
  ```

  instead, you can use

  ```js
  myArr.splice(5, 1, 4)
  ```

---

class: center, middle

## Vue.js and TypeScript

---

### Vue.js and TypeScript

So far, we've seen Vue.js just called from JavaScript. But, for instance, `lifeline` takes an array of booleans in its data value but there is no way to express that and we could pass the wrong data.

Let's integrate Vue.js with TypeScript



There are *three* common ways of declaring components in Vue. We've seen the direct method. I'm going to show you one based on TypeScript classes



[ChemCards using WebPack, Vue, and TypeScript](chemcards/)  

---

### TypeScript modules

First, we're going to use TypeScript modules. These involve `.ts` files declaring what classes and names they export and import



In `index.ts`

```ts
import Vue from "vue";
import GameHeaderView from "./components/GameHeaderView";
import GameData from "./model/GameData";
import GameBodyView from "./components/GameBodyView";
import CardView from "./components/CardView"
```



In (for example) GameData:

```ts
export default class GameData {
  // ...
}
```

---

### Our top-level view

```ts
let gd = new GameData()

let v = new Vue({
    el: "#app",
    template: `
    <div class="card-table">
        <game-header-view :game-data="gd"></game-header-view>
        <game-body-view :game-data="gd"></game-body-view>
    </div>`,
    data: {
        gd: gd
    },
    components: {
        GameHeaderView,
        GameBodyView,
        CardView
    }
});
```

---

### Our top-level view

* Template defined inside the Vue config. Back-ticks used for TypeScript multi-line string.



* Components have also been declared. This uses a slightly unusual notation from ES6 or TypeScript:

  ```ts
  components: {
    GameHeaderView,
    GameBodyView,
    CardView
  }
  ```

  Notice that is an *object* but we have just put *objects* into it, rather than name-value pairs. This uses the entry as both the key-name and the reference to the value. ie, `CardView: CardView`

---

### Let's take a look at a Card

```ts
@Component({
    props: {
        card: Object as () => Card,
        opp: Boolean,
        back: Boolean 
    },
    template: `
      <div>
        <div v-if="!this.card || this.back" v-bind:class="{ 'card-view': true, empty: !this.card, opp: this.opp, back: this.back && this.card }" ></div>
        <div v-if="this.card && !this.back" v-bind:class="{ 'card-view': true, opp: this.opp }" v-on:click="$emit('card-click')" ><img :src="this.card.svg" /></div>
      </div>
    `
})
export default class CardView extends Vue {

  opp!: boolean

  back!: boolean
    
}
```

---

### Let's take a look at a Card



* `props` now have types. By default these are basic types such as `Object`, but we've been able to say that `card` must be a `Card` not just any kind of object:

  ```ts
  card: Object as () => Card,
  ```



* The props that were not immediately initialised needed declaring inside the class

  ```ts
  export default class CardView extends Vue {
    opp!: boolean
    back!: boolean
  }
  ```

  The `!` tells TypeScript that something external (Vue) will initialise these values

----

## v-if and v-bind

* `v-if` for something that should only be shown if a condition is true

  ```ts
  <div v-if="!this.card || this.back" v-bind:class="{ 'card-view': true, empty: !this.card, opp: this.opp, back: this.back && this.card }" ></div>
  ```



  And `v-bind` binding class names to expressions. This is a *two-way* binding.

---

### Event-handlers and synthetic events

*Some* cards can be clicked on and have an effect. We use `v-on` to create the event-handler, but in the card's case all we do is *emit* an event for the containing component to deal with.

```ts
<div v-if="this.card && !this.back" v-bind:class="{ 'card-view': true, opp: this.opp }" v-on:click="$emit('card-click')" ><img :src="this.card.svg" /></div>
```

---

### Capturing that emitted event

In `GameBodyView.ts`:

```ts
<div class="flop-view">
  <card-view v-for="(item, index) in gameData.myFlop" :card="item" @card-click="play(index)" >123</card-view>
</div>
```



* `@card-click` is triggered when the card emits a `card-click`

* `v-for=(item, index)` gets the index of the card in the array, as well as the item

---

