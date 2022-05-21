
## Angular

Angular is a web framework that came out of a team at Google.

* Angular.js was version 1

* "Angular" is version 2 onwards (currently 6), and is a complete rewrite.

Angular uses Typescript classes to define components

---

## NPM packages

Angular is a big framework that is highly modular. This means it has a *lot* of NPM packages

* `@angular/core` - components, directives, dependency injections, lifecycle hooks

* `@angular/compiler` - template compiler

* `@angular/services` - various services applications need, such as its HTTP service

* `@angular/router` - lets your client-side app work with the back and forward browser buttons, and change UI state depending on what URL is shown 

Rather than install modules manually, their docs recommend using their CLI (command-line interface)

---

## CLI

* Angular docs encourage the use of its CLI (command-line interface) to set up projects

  ```sh
  npm install -g @angular/cli
  ```

  ```sh
  ng new my-app
  ```


  If you don't have permission to install the cli globally (e.g. as a user on a shared server), you'd need to install `@angular/cli` locally -- it doesn't matter where as you're just trying to get the `ng new` command available to you.

* Rather than set up webpack, Angular comes set up with a build system and local server.

  ```sh
  cd my-app
  ng serve --open
  ```

* It even sets up git version control in your project for you.

---

## Modules

Angular projects are large, but well-structured

* Automated unit testing, using [Karma](https://karma-runner.github.io), and end-to-end tests using [Protractor](http://www.protractortest.org/)


* *Polyfills* to support Internet Explorer (if desired)


* *Linting* via TSLint


* Environment configurations for production or development



But we're just going to focus on the basics. Let's start just by exploring the directory structure.

---

```sh
├── README.md
├── angular.json
├── e2e
│   ├── src
├── package-lock.json
├── package.json
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── tslint.json
├── tsconfig.json
└── tslint.json
```

---

## index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyApp</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

* `<app-root>` is where the app will be rendered

* Notice there's no script tag! `ng build` (or `ng serve`) will insert it for us.

---

## The app component

Components in Angular are split across four files: the code, the template, the CSS, and the tests.



app.component.ts:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
```

---

## The app component template

```html
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
```

Notice we have double-moustache bindings, similar to other frameworks.



We'll skip the tests for now and the CSS is currently empty

---

### Modules

Just as Angular is modular, it also encourages you to make your code modular.

app.module.ts:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Notice there are two separate module systems here -- TypeScript's modules and Angular's.

---

### Generating a component

Let's follow the "Tour of Heroes" for a moment and generate a component:

```sh
ng generate component heroes
```



```sh
$ ng generate component heroes
CREATE src/app/heroes/heroes.component.css (0 bytes)
CREATE src/app/heroes/heroes.component.html (25 bytes)
CREATE src/app/heroes/heroes.component.spec.ts (628 bytes)
CREATE src/app/heroes/heroes.component.ts (269 bytes)
UPDATE src/app/app.module.ts (396 bytes)
```

---

### Or, check git

```sh
$ git status
On branch bluepeter
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   src/app/app.component.ts
	modified:   src/app/app.module.ts

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	src/app/heroes/
```

---

### Notes on Components

* Binding in text

  ```html
  <span class="badge">{{hero.id}}</span> {{hero.name}}
  ```



* For loops

  ```html
  <li *ngFor="let hero of heroes">
  ```



* Optionally binding a CSS class

  ```html
  [class.selected]="hero === selectedHero"
  ```



* Binding an event to a method

  ```html
  (click)="onSelect(hero)"
  ```


---

## Notes on compents

* Binding an input to a "model" value

  ```html
  <input [(ngModel)]="selectedHero.name" placeholder="name">
  ```

  But you'll also need to import the module in app.module.ts

  ```ts
  import { FormsModule } from '@angular/forms';
  ```

  ```ts
  imports: [
    BrowserModule,
    FormsModule
  ],
  ```

---

### Services

When it comes to communicating with the server, you might want to write a *service*. These are provided via *dependency injection*.

* `ng generate service my` will generate a `myService` service for you


* You then add the service to the constructor of components that need it

  ```ts
  constructor(private myservice: myService) { }
  ```



