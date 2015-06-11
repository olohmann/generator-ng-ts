'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var nameProcessor = require('../name-processor');
var generators = yeoman.generators;

module.exports = generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
        this.mkdirp = require('mkdirp');
    },

    constructor: function() {
        // arguments and options should be
        // defined in the constructor.
        generators.Base.apply(this, arguments);
        this.argument('appName', { type: String, required: false });
        this.argument('wwwRoot', { type: String, required: false });
    },

    welcome: function() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the stunning '
                + chalk.red('ng ts') +
                ' generator! A lovely marriage of '
                + chalk.green('AngularJS') + ' and '
                + chalk.blue('TypeScript')
            ));
    },

    prompting: function () {

        var done = this.async();

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What would you like to name the app?',
            default: this.appName || path.basename(process.cwd())
        },
        {
            type: 'input',
            name: 'wwwRoot',
            message: 'Which folder is the static content root of your app?',
            default: this.wwwRoot || 'wwwroot'
        }];

        this.prompt(prompts, function (answers) {
            this.appName = answers.appName || 'ng-ts-app';
            this.wwwRoot = answers.wwwRoot || 'wwwroot';
            done();
        }.bind(this));
    },

    displayName: function() {
        this.log('Creating ' + this.appName + ' app based on ng-ts.');
    },

    writing: {
        folders: function() {
            this.mkdirp('.settings');
            this.mkdirp(this.wwwRoot);
            this.mkdirp(this.wwwRoot + '/app');
            this.mkdirp(this.wwwRoot + '/styles');
            this.mkdirp(this.wwwRoot + '/typings');
            this.mkdirp(this.wwwRoot + '/vendor');
        },

        files: function () {
            var that = this;

            var ctx = {
                appName: nameProcessor.getCamelizedName(that.appName),
                appModuleName: nameProcessor.getModuleName(that.appName),
                appNameSlugified: nameProcessor.getSlugifiedName(that.appName),
                wwwRoot: that.wwwRoot
            };

            var copyCmds = [
                ['editorconfig','.editorconfig'],
                ['_.ng-ts.json','.ng-ts.json'],
                ['_tsconfig.json','tsconfig.json'],
                ['_tslint.json','tslint.json'],
                ['_README.md','README.md'],
                ['_package.json','package.json'],
                ['_bower.json','bower.json'],
                ['_tsd.json','tsd.json'],
                ['_gulpfile.js','gulpfile.js'],
                ['_gulp.config.js','gulp.config.js'],
                ['_.bowerrc','.bowerrc'],

                // VS Code Settings
                ['.settings/tasks.json.tmpl','./.settings/tasks.json'],

                ['wwwroot/_index.html', that.wwwRoot + '/index.html'],

                ['wwwroot/app/app.module.ts.tmpl', that.wwwRoot + '/app/app.module.ts'],

                ['wwwroot/app/blocks/exception/exception-handler.provider.ts.tmpl', that.wwwRoot + '/app/blocks/exception/exception-handler.provider.ts'],
                ['wwwroot/app/blocks/exception/exception.module.ts.tmpl', that.wwwRoot + '/app/blocks/exception/exception.module.ts'],
                ['wwwroot/app/blocks/exception/exception.ts.tmpl', that.wwwRoot + '/app/blocks/exception/exception.ts'],
                ['wwwroot/app/blocks/log/log.module.ts.tmpl', that.wwwRoot + '/app/blocks/log/log.module.ts'],
                ['wwwroot/app/blocks/log/logger.ts.tmpl', that.wwwRoot + '/app/blocks/log/logger.ts'],
                ['wwwroot/app/blocks/router/router-helper.provider.ts.tmpl', that.wwwRoot + '/app/blocks/router/router-helper.provider.ts'],
                ['wwwroot/app/blocks/router/router.module.ts.tmpl', that.wwwRoot + '/app/blocks/router/router.module.ts'],

                ['wwwroot/app/core/404.html.tmpl', that.wwwRoot + '/app/core/404.html'],
                ['wwwroot/app/core/config.ts.tmpl', that.wwwRoot + '/app/core/config.ts'],
                ['wwwroot/app/core/constants.ts.tmpl', that.wwwRoot + '/app/core/constants.ts'],
                ['wwwroot/app/core/core.module.ts.tmpl', that.wwwRoot + '/app/core/core.module.ts'],
                ['wwwroot/app/core/core.route.ts.tmpl', that.wwwRoot + '/app/core/core.route.ts'],

                ['wwwroot/app/home/home.controller.ts.tmpl', that.wwwRoot + '/app/home/home.controller.ts'],
                ['wwwroot/app/home/home.route.ts.tmpl', that.wwwRoot + '/app/home/home.route.ts'],
                ['wwwroot/app/home/home.html.tmpl', that.wwwRoot + '/app/home/home.html'],
                ['wwwroot/app/home/home.module.ts.tmpl', that.wwwRoot + '/app/home/home.module.ts'],

                ['wwwroot/typings/tsd.d.ts', that.wwwRoot + '/typings/tsd.d.ts'],

                ['wwwroot/styles/styles.css.tmpl', that.wwwRoot + '/styles/styles.css']
            ];

            copyCmds.forEach(function(pair) {
                that.fs.copyTpl(
                    that.templatePath(pair[0]),
                    that.destinationPath(pair[1]),
                    ctx
                );
            });
        }
    },

    install: function() {
        var that = this;
        that.installDependencies(function() {
            that.log('Running ' + chalk.yellow.bold('tsd reinstall && tsd rebundle') +
                '. If this fails run the commands ' +
                'yourself. tsd must be installed via `npm install -g tsd@next`.');

            var tsdReinstall = that.spawnCommand('tsd', ['reinstall']);
            tsdReinstall.on('close', function(code) {
                var tsdRebundle = that.spawnCommand('tsd', ['rebundle']);
                tsdRebundle.on('close', function() {
                    that.log('Running gulp tsbuild...');
                    that.spawnCommand('gulp', ['tsbuild']);
                });
            });
        });

    }
});
