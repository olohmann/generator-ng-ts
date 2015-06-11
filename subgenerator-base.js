'use strict';
var yeoman = require('yeoman-generator');
var nameProcessor = require('./name-processor');
var ngTsEnvironment = require('./ng-ts-environment');

module.exports = yeoman.generators.NamedBase.extend({
    constructor: function() {

        yeoman.generators.NamedBase.apply(this, arguments);
        this.argument('module', {
            type: String,
            required: false
        });
    },

    _initializing: function() {
    },

    _prompting: function() {
        var that = this;

        var done = this.async();
        if (this.module) {
            done();
            return;
        }

        ngTsEnvironment.deriveModuleName(process.cwd())
        .then(function (name) {
            that.module = name;
            done();
        });
    },

    _default: function() {
        var that = this;
        var done = that.async();
        this.nameCamelized = nameProcessor.getCamelizedName(this.name);
        this.namePascalized = nameProcessor.getClassName(this.name);
        this.moduleNameCamelized = nameProcessor.getCamelizedName(this.module);
        this.moduleNamePascalized = nameProcessor.getModuleName(this.module);

        ngTsEnvironment.getRelativePathToWwwRoot(process.cwd())
        .then(function (relativePath) {
            that.relativePathToWwwRoot = relativePath;
            done();
        });
    }
});
