# generator-ng-ts [![Build Status](https://secure.travis-ci.org/olohmann/generator-ng-ts.png?branch=master)](https://travis-ci.org/olohmann/generator-ng-ts)

> A [Yeoman](http://yeoman.io) generator for [Angular 1.x](https://angularjs.org/) projects built with [TypeScript](http://www.typescriptlang.org/).

## Features

* Creates a full-blown Angular/TypeScript project setup. Including a gulpfile that is able to generate a [tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json) file for maxiumum editor compatibilty. No gulpfile compiler magic! It simply calls your installed TypeScript compiler which automatically picks up the `tsconfig.json` file.

* Supports Angular sub-generators. So far directives, controllers and modules are covered.

* It is server agnostic and just creates static HTML, JavaScript and CSS files. That is, this generator does not rely on Node.JS or ASP.NET 5. 

* Adheres to established community guidelines. That is the structure and coding aims for compatibilty with [John Papa](http://www.johnpapa.net/)'s excellent [Angular styleguide]().

* Adopts some of the infrastructure components of [John Papa](http://www.johnpapa.net/)'s [HotTowel generator](https://github.com/johnpapa/generator-hottowel), but tries to avoid much of the template-throw-away-code.

## Missing Features

Some features that might be added in future releases:

* Complete minification flow (including vendor components)
* LESS support
* Unit testing item templates & gulp tasks

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

### Getting To Know Yeoman

Read the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT © [Oliver Lohmann](http://www.oliver-lohmann.me/)
