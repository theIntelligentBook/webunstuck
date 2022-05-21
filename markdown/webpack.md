## Compile-to-JS, CSS Preprocessors...

* We're starting to get more than one preprocessor. eg, SASS for CSS, tsc for TypeScript

* At the moment, our TypeScript is compiled, but into separate .js files

* What if we had one tool that could invoke all our preprocessing for us, and bundle up single files to deliver to the browser?

* Enter, *Webpack!*

---

## Our example

* We're going to start to introduce a project structure that will be familiar to Java developers with Gradle and Maven:

  * `/src` folder containing sources

  * folder for the built output (`/dist`)

* Like gradle, webpack is going to be configured via plugins (and "loaders"), though these are not as concise.

* Just as gradle projects have a `build.gradle` that is a Groovy script, Webpack builds have `webpack.config.js` which is a JavaScript script.

* Our example uses Webpack, TypeScript, and Vue.js  
  https://github.com/Microsoft/TypeScript-Vue-Starter (modified)

---

## First, install npm

1. npm init

2. npm install --save-dev typescript webpack ts-loader css-loader vue vue-loader vue-template-compiler

---

## Next, initialise TypeScript

3. tsc --init

4. edit `tsconfig.json`:
   * module -> `es2015`
   * noImplicitReturns -> `true`
   * outdir -> `"./built"`
   * include -> `[ "./src/**/*" ]`

```json
{
  "compilerOptions": {
      "outDir": "./built/",
      "sourceMap": true,
      "strict": true,
      "noImplicitReturns": true,
      "module": "es2015",
      "moduleResolution": "node",
      "target": "es5"
  },
  "include": [
      "./src/**/*"
  ]
}
```

---

## Set up webpack

4. turn main in package.json private

5. install webpack-cli

6. npx webpack

7. add webpack.config.js

8. Add `"build": "webpack",` to `scripts` in `package.json`

9. npm run build

10. npm install --save-dev vue-class-component

11. npm run build -- --watch

