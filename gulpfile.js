/// <binding AfterBuild='publish:bootstrap-xclusive' Clean='clean:bootstrap-xclusive' ProjectOpened='watch:bootstrap-xclusive' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
"use strict";

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    path = require('path'),
    project = require('./project.json'),
    pkg = require('./bower.json');

project.fileName = project.name.replace(/-/g, '.');

var optionset = {
    banner: ['/**',
            ' * <%= pkg.name %> v<%= pkg.version %>',
            ' * <%= pkg.description %>',
            ' * link <%= pkg.homepage %>',
            ' * Copyright (c) 2015-<%= new Date().getFullYear() %> by <%= pkg.author.name %>',
            ' * Released under the <%= pkg.licenses[0].type %> license',
            ' **/\n'].join('\n'),
    less: {
        src: [
            './src/less/additional/*.less',
            '!./src/less/additional/*.min.less'
        ],
        dest: './test/css'
    },
    jsx: {
        src: [
            './src/jsx/additional/*.jsx',
            '!./src/jsx/additional/*.min.jsx'
        ],
        dest: './test/js'
    },
    clean: {
        distDest: './dist/*',
        testDest: ['test/css/', 'test/js/', 'test/fonts/']
    },
    publish: {
        less: './src/less/bootstrap.xclusive.less',
        cssDest: './dist/css/',
        jsSrc: './src/jsx/bootstrap.xclusive.json',
        jsDest: './dist/js/',
        concat: '' + project.fileName + '.js',
        fontsSrc: './src/fonts/*.*',
        fontsDest: './dist/fonts/'
    }
};


/*
@include 'header.jsx';
@include 'additional/extend.jsx';
@include 'additional/forms.jsx';
@include 'additional/spinner.jsx';
@include 'additional/placeholder.jsx';
@include 'additional/passwordstrength.jsx';
@include 'additional/table.jsx';
@include 'additional/dialog.jsx';
@include 'additional/popup.jsx';
*/

//watch
gulp.task('check:less', async () => {
    gulp.src(optionset.less.src)
        .pipe($.plumber())
        .pipe($.less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe($.header(optionset.banner, { pkg: pkg }))
        .pipe(gulp.dest(optionset.less.dest));
});
gulp.task('check:script', async () =>  {
    gulp.src(optionset.jsx.src)
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        .pipe($.babel())
        .pipe($.header(optionset.banner, { pkg: pkg }))
        .pipe(gulp.dest(optionset.jsx.dest));
});
gulp.task('watch:bootstrap-xclusive', () =>  {
    gulp.watch(optionset.less.src, gulp.series('check:less'));
    gulp.watch(optionset.jsx.src, gulp.series('check:script'));
});

//clean
gulp.task('clean:bootstrap-xclusive', async () =>  {
    gulp.src(optionset.clean.distDest)
        .pipe($.clean());
    gulp.src(optionset.clean.testDest)
        .pipe($.clean());
});

//publish
gulp.task('publish:bootstrap-xclusive', async () =>  {
    gulp.src(optionset.publish.less)
        .pipe($.plumber())
        .pipe($.less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe($.header(optionset.banner, { pkg: pkg }))
        .pipe(gulp.dest(optionset.publish.cssDest))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.cssmin())
        .pipe($.header(optionset.banner, { pkg: pkg }))
        .pipe(gulp.dest(optionset.publish.cssDest));

    var jsSrc = require(optionset.publish.jsSrc);
    gulp.src(jsSrc)
        .pipe($.plumber())
        .pipe($.concat(optionset.publish.concat))
        .pipe($.babel())
        //.pipe($.replace(/(\n\r)*/g, ''))
        //.pipe($.rename({ extname: '.js' }))
        .pipe($.header(optionset.banner, { pkg: pkg }))
        .pipe(gulp.dest(optionset.publish.jsDest))
        .pipe($.rename({ suffix: '.min' }))
        .pipe($.uglify())
        .pipe($.header(optionset.banner, { pkg: pkg }))
        .pipe(gulp.dest(optionset.publish.jsDest));

    gulp.src(optionset.publish.fontsSrc)
        .pipe(gulp.dest(optionset.publish.fontsDest));
});
