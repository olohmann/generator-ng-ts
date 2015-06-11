var args = require('yargs').argv;
var config = require('./gulp.config')();
var runSequence = require('run-sequence');

var gulp = require('gulp-help')(require('gulp'));
var $ = require('gulp-load-plugins')({lazy: true});

var colors = $.util.colors;

// ------------- TASKS ---------------------------------

gulp.task('default', 'Display this help text.', ['help']);

gulp.task('wiredep', 'Wire all dependencies into index.html', function() {
    log(colors.green('Wiring dependencies into HTML'));

    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();
    log('output: ' + config.client);
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(inject(config.js, '', config.jsOrder))
        .pipe(inject(config.css))
        .pipe(gulp.dest(config.client));
});

gulp.task('test', false /*'Execute tests as configured in Karma'*/, function() {
    log(colors.red('TODO: Not Implement.'));
});

gulp.task('tsbuild', 'Build the TypeScript project (compile and wire).', function(cb) {
   runSequence('tscompile', 'wiredep', cb);
});

gulp.task('tscompile', 'Compile the TypeScript project (no wiring).', ['tsconfig'], function(cb) {
    var cmd = new $.run.Command('tsc');
    cmd.exec(cb);
});

gulp.task('tsconfig', 'Create TypeScript project file (tsconfig.json).', function() {
  var tsConfig = $.tsconfig({
    tsOrder: config.tsOrder,
    tsConfig: {
            "compilerOptions": {
                "target": "ES3",
                "removeComments": true,
                "sourceMap": true,
                "noImplicitAny": true,
                "out": config.clientCompiledApp
            }
        }
  });

  return gulp.src([config.typings, config.ts])
        .pipe(tsConfig())
        .pipe(gulp.dest('.'));
});

// ------------- Watchers  ---------------------------------
gulp.task('watch-ts-tsbuild', 'Watch TS files and run "tsbuild" on change', function () {
    var watcher = gulp.watch([config.typings, config.ts], ['tsbuild'], {debounceDelay: 300});

    watcher.on('change', function (event) {
        log('File ' + colors.red(event.path) + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('watch-ts-tsconfig', 'Watch TS files and run "tsconfig" on change', function () {
    var watcher = gulp.watch([config.typings, config.ts], ['tsconfig'], {debounceDelay: 300});

    watcher.on('change', function (event) {
        log('File ' + colors.red(event.path) + ' was ' + event.type + ', running tasks...');
    });
});

// ------------- TASK HELPERS --------------------------
/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, order) {
    var options = {read: false, relative: true};
    if (label) {
        options.name = 'inject:' + label;
    }

    return $.inject(orderSrc(src, order), options);
}

/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc (src, order) {
    //order = order || ['**/*'];
    return gulp
        .src(src)
        .pipe($.if(order, $.order(order)));
}

/**
 * Log a message
 * @param   {Object} msg    Message to log.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log(colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log(colors.blue(msg));
    }
}
