
## HTML and JavaScript are old

* The way we use the web now is not like 1993, but most browsers still support the practices of old

---

### Loading a page (simplified)

1. Browser loads HTML
2. Begins parsing HTML
3. Encounters a `<script src="..." ></script>` tag

The browser needs to 
* Fetch the script
* Parse it
* Run it

and then continue parsing the HTML

---

### An old practice

* Put the `<script>` tags at the *bottom* of the HTML so that the rest of the page has been parsed

    * Doesn't solve the modern problem that the page needs the JS to function

---

### Async attribute

Load this asynchronously and run it when it's available, without delaying page load

  HTML5:

  ```html
    <script src="//example.com/my.js" async />
  ```    

  XHTML:

  ```html
    <script src="//example.com/my.js" async="async" />
  ```    

---

### Defer attribute

Run this script when the DOM is loaded (after parsing the page)

  HTML5:

  ```html
    <script src="//example.com/my.js" defer />
  ```    

  XHTML:

  ```html
    <script src="//example.com/my.js" defer="defer" />
  ```    

---

### But those don't solve the whole problem

* Every `<script src="...">` element requires an HTTP request

* Every byte of script needs to be sent over the network

* Every character of the script needs to be parsed

---

### Programmers want

* Well-spaced, well-commented code (long)
* Code organised into files and directories (many scripts)

### Performance wants

* No wasted characters
* All in one file

---

### What if we *minify* it

* Write well-organised, well-commented code
* Have a build tool concatenate and shrink it before sending it to the browser

---

### JSMin 

* Douglas Crockford, 2001
* Removes comments and unnecessary whitespace

---

### Before 

<pre style="height: 75vh; overflow: auto;">
// is.js

// (c) 2001 Douglas Crockford
// 2001 June 3


// is

// The -is- object is used to identify the browser.  Every browser edition
// identifies itself, but there is no standard way of doing it, and some of
// the identification is deceptive. This is because the authors of web
// browsers are liars. For example, Microsoft's IE browsers claim to be
// Mozilla 4. Netscape 6 claims to be version 5.

var is = {
    ie:      navigator.appName == 'Microsoft Internet Explorer',
    java:    navigator.javaEnabled(),
    ns:      navigator.appName == 'Netscape',
    ua:      navigator.userAgent.toLowerCase(),
    version: parseFloat(navigator.appVersion.substr(21)) ||
             parseFloat(navigator.appVersion),
    win:     navigator.platform == 'Win32'
}
is.mac = is.ua.indexOf('mac') >= 0;
if (is.ua.indexOf('opera') >= 0) {
    is.ie = is.ns = false;
    is.opera = true;
}
if (is.ua.indexOf('gecko') >= 0) {
    is.ie = is.ns = false;
    is.gecko = true;
}
</pre>

---

### After
```js
var is={ie:navigator.appName=='Microsoft Internet Explorer',java:navigator.javaEnabled(),ns:navigator.appName=='Netscape',ua:navigator.userAgent.toLowerCase(),version:parseFloat(navigator.appVersion.substr(21))||parseFloat(navigator.appVersion),win:navigator.platform=='Win32'}
is.mac=is.ua.indexOf('mac')>=0;if(is.ua.indexOf('opera')>=0){is.ie=is.ns=false;is.opera=true;}
if(is.ua.indexOf('gecko')>=0){is.ie=is.ns=false;is.gecko=true;}
```

---

### We can do better than this

* JSMin uses only very simple strategies to minify code

* Other things we could do:

    * Shorten names (eg, variable and parameter names)
    * Remove code that isn't called
    * Use interesting rules to shorten expressions, eg De Morgan's rule

    ```js
    !a && !b && !c && !d
    ```
    
    to 
    
    ```js
    !(a || b || c || d)
    ```
    
    (but carefully -- https://zyan.scripts.mit.edu/blog/backdooring-js/ )

---

### Taking this further...

* Compilers can do much cleverer optimisations

* Compile JavaScript and output... shorter JavaScript?


---

### Google Closure Compiler

> The Closure Compiler is a tool for making JavaScript download and run faster. It is a true compiler for JavaScript. Instead of compiling from a source language to machine code, it compiles from JavaScript to better JavaScript. It parses your JavaScript, analyzes it, removes dead code and rewrites and minimizes what's left. It also checks syntax, variable references, and types, and warns about common JavaScript pitfalls.

https://developers.google.com/closure/compiler/

---

### Live example with Closure Compiler

http://closure-compiler.appspot.com/home

---

### But...

* If your code looks like this:

```js
(function(){'use strict';function aa(){return function(a){return a}}function ba(){return function(){}}function ca(a){return function(b){this[a]=b}}function da(a){return function(){return this[a]}}function e(a){return function(){return a}}var l,ea="object"===typeof __ScalaJSEnv&&__ScalaJSEnv?__ScalaJSEnv:{},fa="object"===typeof ea.global&&ea.global?ea.global:"object"===typeof global&&global&&global.Object===Object?global:this;ea.global=fa;
var ga="object"===typeof ea.exportsNamespace&&ea.exportsNamespace?ea.exportsNamespace:fa;ea.exportsNamespace=ga;fa.Object.freeze(ea);var ha={semantics:{asInstanceOfs:2,moduleInit:2,strictFloats:!1},assumingES6:!1};fa.Object.freeze(ha);fa.Object.freeze(ha.semantics);var ia=fa.Math.imul||function(a,b){var c=a&65535,d=b&65535;return c*d+((a>>>16&65535)*d+c*(b>>>16&65535)<<16>>>0)|0},ja=fa.Math.fround||function(a){return+a},ka=0,ma=fa.WeakMap?new fa.WeakMap:null;
function na(a){return function(b,c){return!(!b||!b.a||b.a.Li!==c||b.a.Ki!==a)}}function oa(a){for(var b in a)return b}function qa(a,b){return new a.yo(b)}function m(a,b){return ra(a,b,0)}function ra(a,b,c){var d=new a.yo(b[c]);if(c<b.length-1){a=a.Ek;c+=1;for(var f=d.e,g=0;g<f.length;g++)f[g]=ra(a,b,c)}return d}function sa(a){return void 0===a?"undefined":a.toString()}
function ta(a){switch(typeof a){case "string":return q(r);case "number":var b=a|0;return b===a?ua(b)?q(va):wa(b)?q(xa):q(ya):za(a)?q(Aa):q(Ba);case "boolean":return q(Ca);case "undefined":return q(Da);default:if(null===a)throw(new Fa).d();return Ga(a)?q(Ha):a&&a.a?q(a.a):null}}function Ia(a,b){return a&&a.a||null===a?a.q(b):"number"===typeof a?"number"===typeof b&&(a===b?0!==a||1/a===1/b:a!==a&&b!==b):a===b}
   ```

   How do you debug it?
   
---

### Sourcemaps   

* Get the minifier to produce a map from locations and names in the compressed code back to locations and names in the original code

* Put the location of the map at the end of the minified source

   ```js
   //# sourceMappingURL=/path/to/file.js.map
   ```

* When you open the debugger, the browser can request the original code

* And use the map to show where you are in the original code, even while it executes the minified code

---

### Sourcemap demo

(in video only)