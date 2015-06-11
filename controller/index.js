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
        console.dir(that.name + ' ' + that.module);
        this.fs.copyTpl(
            this.templatePath('controller.ts.tmpl'),
            this.destinationPath(that.nameCamelized + '.controller.ts'), {
                nameCamelized: that.nameCamelized,
                namePascalized: that.namePascalized,
                moduleNameCamelized: that.moduleNameCamelized,
                moduleNamePascalized: that.moduleNamePascalized
            }
        );
    }
});
