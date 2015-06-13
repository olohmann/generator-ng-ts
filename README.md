# generator-ng-ts [![Build Status](https://secure.travis-ci.org/olohmann/generator-ng-ts.png?branch=master)](https://travis-ci.org/olohmann/generator-ng-ts)

> A [Yeoman](http://yeoman.io) generator for [Angular 1.x](https://angularjs.org/) [TypeScript](http://www.typescriptlang.org/) projects.

## Features

* Creates a **complete Angular/TypeScript project setup**. Including a gulpfile that is able to maintain a standard  [tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json) file for maxiumum editor compatibilty. There is no gulpfile TypeScript compiler magic involved! The gulp build task simply calls your installed TypeScript compiler which automatically picks up the setup in the `tsconfig.json` file.

* Supports **Angular sub-generators**. So far directives, controllers and modules are covered.

* It is **server framework agnostic**. That is, it just creates static HTML, JavaScript and CSS files in a sub-directory of your choice (e.g. `public` or `wwwroot`). Thus you can use the generator to in combination with a Node.JS or ASP.NET 5 backend. 

* Adheres to established **community guidelines**. That is, the structure and coding aims for compatibilty with [John Papa](http://www.johnpapa.net/)'s excellent [Angular styleguide](https://github.com/johnpapa/angular-styleguide).

* Adopts some of the infrastructure components of [John Papa](http://www.johnpapa.net/)'s [HotTowel generator](https://github.com/johnpapa/generator-hottowel), but tries to avoid the template-throw-away-code.

## Currently Missing Features

Features for future releases:

* Complete minification flow (including vendor components)
* LESS support
* Item templates & gulp tasks for (unit) testing

## Getting Started

### Installation

```bash
npm install -g yo
npm install -g generator-ng-ts
```

### Scaffold an App
```bash
mkdir app
cd app
yo ng-ts 
```

Result:
```
+---.settings                              editor settings VS Code
\---wwwroot                                static web root
    +---app                                angular app root
    |   +---blocks                         infrastructure components
    |   |   +---exception
    |   |   +---log
    |   |   \---router
    |   +---core                           routing and core app config
    |   \---home                           the home module
    +---styles                             CSS
    +---typings                            TypeScript typings
    |   +---angularjs
    |   [... more typings ...]
    \---vendor                             3rd party components (via bower) 
        +---angular
        [... vendor components ...]
```

### Scaffold a Module
```
cd wwwroot/app
mkdir widgets
cd widgets
yo ng-ts:module
```

Creates a file `widgets.module.ts`.

Scaffolding is conventional. The name of the module will be derived automaticall via inspecting your subfolder hierarchy. 

### Scaffold a Directive
```
yo ng-ts:directive dateTimeNow
```

Creates three files: 

* `dateTimeNow.directive.controller.ts`
* `dateTimeNow.directive.ts`
* `dateTimeNow.directive.html`

### Gulp Tasks

The gulpfile has a built-in help page that lists all the tasks and provides a short description:

```bash
gulp help
```

### Getting To Know Yeoman

Read the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT © [Oliver Lohmann](http://www.oliver-lohmann.me/)
