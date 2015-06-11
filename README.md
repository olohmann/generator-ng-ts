# generator-ng-ts [![Build Status](https://secure.travis-ci.org/olohmann/generator-ng-ts.png?branch=master)](https://travis-ci.org/olohmann/generator-ng-ts)

> A [Yeoman](http://yeoman.io) generator for [Angular 1.x](https://angularjs.org/) projects built with [TypeScript](http://www.typescriptlang.org/).

## Features

* Creates a full-blown Angular/TypeScript project setup. Including a gulpfile that is able to generate a [tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json) file for maxiumum editor compatibilty. No gulpfile compiler magic! It simply calls your installed TypeScript compiler which automatically picks up the `tsconfig.json` file.

* Supports Angular sub-generators. So far directives, controllers and modules are covered.

* It is server agnostic and just creates static HTML, JavaScript and CSS files. That is, this generator does not rely on Node.JS or ASP.NET 5. 

* Adheres to established community guidelines. That is the structure and coding aims for compatibilty with [John Papa](http://www.johnpapa.net/)'s excellent [Angular styleguide]().

* Adopts some of the infrastructure components of [John Papa](http://www.johnpapa.net/)'s [HotTowel generator](https://github.com/johnpapa/generator-hottowel), but tries to avoid much of the template-throw-away-code.

## Getting Started

### Installation

```bash
npm install -g yo
npm install -g generator-ng-ts
```

### Scaffold an App
```bash
mkdir my-app
cd my-app
yo ng-ts 
```

### Scaffold a Module
```
cd my-app/wwwroot/app
mkdir widgets
yo ng-ts:module
```

Scaffolding is conventional. The name of the module will be the name of the subfolder hierarchy. The initial app name that you provided will be respected.

Examples:
* Folder: `my-app/wwwroot/app/widgets` --> module name: `myapp.widgets`
* Folder: `my-app/wwwroot/app/utils/widgets` --> module name: `myapp.utils.widgets`

### Scaffold a Directive
```
cd my-app/wwwroot/app/widgets
yo ng-ts:directive dateTimeNow
```



### Getting To Know Yeoman

Read the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT © [Oliver Lohmann](http://www.oliver-lohmann.me/)
