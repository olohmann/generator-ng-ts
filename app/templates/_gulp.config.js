var path = require('path');
var wiredep = require('wiredep');

module.exports = function() {
    var clientSrcRootName = '<%= wwwRoot %>';
    var client = './' + clientSrcRootName +'/';
    var clientApp = path.join(client, 'app');
    var clientCompiledAppName = 'app.js';
    var clientCompiledApp = path.join(client, clientCompiledAppName);

    var tsClient =  [clientApp + '/**/*.ts'];
    var tsTypings = [client + '/typings/tsd.d.ts'];

    var config = {
        client: client,
        clientSrcRootName: clientSrcRootName,
        clientApp: clientApp,

        index: path.join(client, 'index.html'),

        tsClient: tsClient,
        tsTypings: tsTypings,
        tsAll: [].concat(tsTypings).concat(tsClient),
        tsOrder: [
            '**/*.d.ts',
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
                "target": "es5",
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
