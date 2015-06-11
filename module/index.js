'use strict';
var yeoman = require('yeoman-generator');
var generators = yeoman.generators;
var nameProcessor = require('../name-processor');
var ngTsEnvironment = require('../ng-ts-environment');

module.exports = generators.Base.extend({
    initializing: function () {
    },

    constructor: function() {
        generators.Base.apply(this, arguments);
        this.argument('name', { type: String, required: false });
    },

    prompting: function () {
        var that = this;

        var done = that.async();
        if (that.name) {
            done();
            return;
        }

        ngTsEnvironment.deriveModuleName(process.cwd())
        .then(function (name) {
            that.name = name;
            done();
        });
    },

    default: function() {
        this.nameCamelized = nameProcessor.getCamelizedName(this.name);
        this.namePascalized = nameProcessor.getClassName(this.name);
    },

    writing: function() {
        var that = this;
        var fileName = that.nameCamelized.split('.').slice(1).join('.');

        this.fs.copyTpl(
            this.templatePath('module.ts.tmpl'),
            this.destinationPath(fileName + '.module.ts'), {
                nameCamelized: that.nameCamelized,
                namePascalized: that.namePascalized,
            }
        );
    }
});
