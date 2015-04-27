'use strict';
require("babel/register")({
  stage: 1
});

var gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    gulpsass = require('gulp-sass'),
    sketch = require("gulp-sketch"),
    iconfont = require('gulp-iconfont'),
    bourbon = require('node-bourbon').includePaths,
    deploypages = require('gulp-gh-pages'),
    webpack = require('gulp-webpack'),
    gls = require('gulp-live-server'),
    mocha = require('gulp-mocha');

var dest = './dest/webclient',
    fontName = 'appfont';

gulp.task("webpack", function() {
    var config = require('./webpack.config.js');
    return gulp.src('src/webclient/assets/js/apps/apps.js')
      .pipe(webpack(config))
      .pipe(gulp.dest(dest+'/assets/js/'));
});

gulp.task("webpack-watch", function() {
    var config = require('./webpack.config.js');
    config.watch = true;
    return gulp.src('src/webclient/assets/js/apps/apps.js')
      .pipe(webpack(config))
      .pipe(gulp.dest(dest+'/assets/js/'));
});

gulp.task('lint', function () {
    return gulp.src(['src/webclient/assets/js/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('styles', function() {
    return gulp.src([
            'src/webclient/assets/scss/app.scss'
        ])
        .pipe(gulpsass({
            outputStyle: 'expanded',
            includePaths: [
                'src/webclient/assets/scss',
                'node_modules/bootstrap-sass/assets/stylesheets'
            ].concat(bourbon),
            errLogToConsole: true
        }))
        .pipe(gulp.dest(dest + '/assets/css'));
});

gulp.task('iconfont', function() {
    return gulp.src('src/webclient/assets/icons/symbol-font-16px.sketch') // you can also choose 'symbol-font-16px.sketch'
        .pipe(sketch({
            export: 'artboards',
            formats: 'svg'
        }))
        .pipe(iconfont({
            fontName: fontName,
            appendCodepoints: true,
            descent: 80
        }))
        .pipe(gulp.dest(dest + '/assets/fonts'))

});

gulp.task('resources', function() {
    return gulp.src(['src/webclient/**', '!src/webclient/assets/**'])
        .pipe(gulp.dest(dest));
});

gulp.task('img', function() {
    return gulp.src(['src/webclient/assets/img/**'])
        .pipe(gulp.dest(dest+ '/assets/img'));
});

gulp.task('deploypages', function() {
    return gulp.src(dest+'/**/*')
        .pipe(deploypages({branch:'gh-pages'}));
});

gulp.task('watch', function() {
    gulp.watch('src/webclient/assets/scss/**', ['styles']);
    gulp.watch('src/webclient/assets/icons/**', ['iconfont']);
    gulp.watch(['src/webclient/**', '!src/webclient/assets/**'], ['resources']);
    gulp.watch('src/webclient/assets/img/**', ['img']);
});

gulp.task('serve', function() {
    var server = gls.new('./src/server/index.js');
    server.start();
    gulp.watch(['./src/server/**/*.js'], server.start);
});

gulp.task('test:e2e', function() {
    return gulp.src('./test/e2e/index.js', {read: false})
        .pipe(mocha());
});

gulp.task('test:server', function() {
    return gulp.src('./test/server/index.js', {read: false})
        .pipe(mocha());
});

gulp.task('test:webclient', function() {
    return gulp.src('./test/webclient/index.js', {read: false})
        .pipe(mocha());
});


gulp.task('default', ['styles', 'resources', 'img', 'iconfont', 'webpack']);
gulp.task('dev', ['styles', 'resources', 'img', 'iconfont', 'watch', 'webpack-watch']);
gulp.task('test', ['test:e2e', 'test:server', 'test:webclient']);
