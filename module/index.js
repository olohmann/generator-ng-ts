'use strict';
var subgeneratorBase = require('../subgenerator-base');

module.exports = subgeneratorBase.extend({
    initializing: function () {
        this._initializing();
    },

    prompting: function () {
        this._prompting();
    },

    default: function() {
        this._default();
    },

    writing: function() {
        var that = this;

        this.fs.copyTpl(
            this.templatePath('module.ts.tmpl'),
            this.destinationPath(that.nameCamelized + '.module.ts'), {
                nameCamelized: that.nameCamelized,
                namePascalized: that.namePascalized,
                moduleNameCamelized: that.moduleNameCamelized,
                moduleNamePascalized: that.moduleNamePascalized
            }
        );
    }
});
