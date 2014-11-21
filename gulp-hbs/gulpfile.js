var gulp = require('gulp'),
    wrap = require('gulp-wrap'),
    concat = require('gulp-concat'),
    declare = require('gulp-declare'),
    handlebars = require('gulp-handlebars'),
    nodemon = require('gulp-nodemon');

var paths = {
    templates: 'templates/**/*.hbs'
};

gulp.task('templates', function() {
    // Load templates from the templates/ folder relative to where gulp was executed
    gulp.src(paths.templates)
    // Compile each Handlebars template source file to a template function
    .pipe(handlebars())
    // Wrap each template function in a call to Handlebars.template
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    // Declare template functions as properties and sub-properties of exports
    .pipe(declare({
        root: 'exports',
        noRedeclare: true, // Avoid duplicate declarations
        processName: function(filePath) {
            // Drop the templates/ folder from the namespace path by removing it from the filePath
            return declare.processNameByPath(filePath.replace('templates/', ''));
        }
    }))
    // Concatenate down to a single file
    .pipe(concat('templates.js'))
    // Add the Handlebars module in the final output
    .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
    // Write the output into the templates folder
    .pipe(gulp.dest('client/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.templates, ['templates']);
});

gulp.task('serve', function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: ['gulpfile.js', 'templates.js']
    });
});

gulp.task('default', ['watch', 'templates', 'serve']);
