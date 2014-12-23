
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
    
    

gulp.task('bundleAmpersand', function() {

    return gulp.src('./scripts/ampersand-proto.js')
        .pipe(browserify({
            debug : true,
            standalone : 'ampersand',
            external : ["jquery"]
        }))
        .pipe(rename('ampersand-bundle.js'))
        .pipe(gulp.dest('./scripts'));
});

gulp.task('serve', function(){
	require('./server');
});