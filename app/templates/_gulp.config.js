var path = require('path');
var wiredep = require('wiredep');

module.exports = function() {
    var clientSrcRootName = '<%= wwwRoot %>';
    var client = './' + clientSrcRootName +'/';
    var clientApp = path.join(client, 'app');
    var clientCompiledAppName = 'app.js';
    var clientCompiledApp = path.join(client, clientCompiledAppName);

    var config = {
        client: client,
        clientSrcRootName: clientSrcRootName,
        clientApp: clientApp,

        index: path.join(client, 'index.html'),

        ts: clientApp + '/**/*.ts',
        typings: client + '/typings/tsd.d.ts',
        tsOrder: [
            '**/app.module.ts',
            '**/*.module.ts',
            '**/*.ts'
        ],

        clientCompiledAppName: clientCompiledAppName,
        clientCompiledApp: clientCompiledApp,

        js: [
            clientCompiledApp
        ],

        jsOrder: undefined,

        css: [
            client + '/styles/*.css'
        ],

        tsConfig: {
            "compilerOptions": {
                "removeComments": true,
                "sourceMap": true,
                "noImplicitAny": true,
                "out": clientCompiledApp
            }
        }
    };

    /* -- BOWER --*/
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var bower = {
        json: require('./bower.json'),
        directory: path.join(client, 'vendor'),
        ignorePath: []
    };

    config.bower = bower;

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    /* -----------*/

    return config;
};
