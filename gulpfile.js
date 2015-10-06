var gulp = require('gulp');

var clean = require('gulp-clean');
var jade = require('gulp-jade');
var rename = require('gulp-rename');

// directory for jade views
var jadeFrontendTemplatesDir = './resources/jade-views/frontend/'; // get files from here
var jadeFrontendTemplatesBuildDir = './resources/views/frontend/'; // and build it here

// clean jade build directory
gulp.task('clean.jade', function () {
  return gulp.src(jadeFrontendTemplatesBuildDir, {read: false})
    .pipe(clean());
});

// build jade templates
gulp.task('jade.templates', ['clean.jade'], function() {

  // jade options
  var options = {
    locals: {},
    pretty: true
  };

  return gulp.src(jadeFrontendTemplatesDir + '/**/*.jade')
    .pipe(jade(options))
    .pipe(rename({
      extname: ".blade.php" // proper extension for blade
    }))
    .pipe(gulp.dest(jadeFrontendTemplatesBuildDir))
});

gulp.task('jade', ['jade.templates']);

gulp.task('default', ['jade']);