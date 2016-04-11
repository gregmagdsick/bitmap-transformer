const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('testMocha', () => {
  return gulp.src('test/**/*test.js')
    .pipe(mocha({
      reporter: 'spec'
    }));
});

// references .eslintrc file
gulp.task('testEslint:testFile', () => {
  return gulp.src('./test/**/*test.js')
  .pipe(eslint({
    'env': {
      'mocha': true,
      'node': true,
      'es6': true
    }
  }))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

// references .eslintrc file
gulp.task('testEslint:non-testFile', () => {
  return gulp.src(['index.js', 'lib/**/*.js', 'gulp.js'])
  .pipe(eslint({
    'env': {
      'node': true,
      'es6': true
    }
  }
  ))
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

gulp.task('test', ['testEslint:non-testFile', 'testEslint:testFile', 'testMocha']);
gulp.task('default', ['test']);
