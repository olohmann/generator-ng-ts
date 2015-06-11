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
        })
        .error(function(err) {
            console.log('Could not derive a module name automatically. Manual input required.');

            var prompts = [{
                type: 'input',
                name: 'module',
                message: 'Which module are you targeting?',
                default: 'MyModule'
            }];

            that.prompt(prompts, function(answers) {
                that.module = answers.module;
                done();
            });
        });
    },

    _default: function() {
        this.nameCamelized = nameProcessor.getCamelizedName(this.name);
        this.namePascalized = nameProcessor.getClassName(this.name);
        this.moduleNameCamelized = nameProcessor.getCamelizedName(this.module);
        this.moduleNamePascalized = nameProcessor.getModuleName(this.module);
    }
});
