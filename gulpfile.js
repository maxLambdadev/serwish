"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

gulp.task("sass", function() {
  return gulp
    .src("src/assets/styles/config/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/css"));
});

gulp.task("sass:watch", function() {
  gulp.watch("src/assets/styles/config/*.scss", ["sass"]);
});
