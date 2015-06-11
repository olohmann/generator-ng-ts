var _ = require('lodash');

var path = require('path');
var Promise = require("bluebird");

var fs = require("fs");
Promise.promisifyAll(fs);

var slash = require('slash');

const ngTsConfig = '.ng-ts.json';

function isRootReached(dir, parentDir) {
    return dir === parentDir;
}

function getParentDir(dir) {
    return path.join(dir, '..');
}

function readConfig(dir) {
    var parentDir = getParentDir(dir);

    return fs.readdirAsync(dir).then(function(files) {
        var file = _.find(files, function(file) {

            return file === ngTsConfig;
        });

        if (file) {
            return fs
                .readFileAsync(path.join(dir, file), 'utf8')
                .then(function(contents) {
                    var config = JSON.parse(contents);

                    // make wwwRoot path dynamically absolute
                    config.wwwRoot = path.join(dir, config.wwwRoot);
                    return config;
                });
        } else {
            if (!isRootReached(dir, parentDir)) {
                return readConfig(parentDir);
            }
            else {
                throw new Error(ngTsConfig + ' not found in your project path.');
            }
        }
    });
}

function getRelativePathToWwwRoot(dir) {
    return readConfig(dir).then(function (config) {
        var relativePath = slash(path.relative(config.wwwRoot, dir));
        if (relativeModulePath.indexOf('..') !== -1) {
            throw new Error('Cannot create an item outside of the static web root.');
        }
        return relativePath;
    });
}

function deriveModuleName(dir) {
    return readConfig(dir).then(function (config) {
        var relativeModulePath = slash(path.relative(path.join(config.wwwRoot, 'app'), dir));
        if (relativeModulePath.indexOf('..') !== -1) {
            throw new Error('Cannot create an item outside of the "app" root.');
        }

        var segments = [config.appName].concat(relativeModulePath.split('/'));
        return segments.join('.');
    });
}

module.exports.readConfig = readConfig;
module.exports.deriveModuleName= deriveModuleName;
module.exports.getRelativePathToWwwRoot = getRelativePathToWwwRoot;
