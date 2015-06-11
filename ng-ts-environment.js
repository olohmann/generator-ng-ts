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

function deriveModuleName(dir) {
    return readConfig(dir).then(function (config) {
        var relativeModulePath = slash(path.relative(config.wwwRoot, dir));
        return relativeModulePath.split('/').join('.');
    });
}

module.exports.readConfig = readConfig;
module.exports.deriveModuleName= deriveModuleName;
