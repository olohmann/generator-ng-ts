'use strict';
var subgeneratorBase = require('../subgenerator-base');

module.exports = subgeneratorBase.extend({
    initializing: function() {
        this._initializing();
    },

    prompting: function() {
        this._prompting();
    },

    default: function() {
        this._default();
    },

    writing: function() {
        var that = this;
        var context = {
            nameCamelized: that.nameCamelized,
            namePascalized: that.namePascalized,
            moduleNameCamelized: that.moduleNameCamelized,
            moduleNamePascalized: that.moduleNamePascalized
        };

        this.fs.copyTpl(
            this.templatePath('directive.ts.tmpl'),
            this.destinationPath(that.nameCamelized + '.directive.ts'),
            context
        );

        this.fs.copyTpl(
            this.templatePath('controller.ts.tmpl'),
            this.destinationPath(that.nameCamelized + '.directive.controller.ts'),
            context
        );

        this.fs.copyTpl(
            this.templatePath('directive.html.tmpl'),
            this.destinationPath(that.nameCamelized + '.directive.html'),
            context
        );
    }
});
