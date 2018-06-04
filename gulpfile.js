const gulp = require('gulp');
// const sass = require('gulp-sass');
// const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

// Init browserSync
browserSync({server: {baseDir: './'}});

// Wrapper for reload
function reload(done) {
  browserSync.reload();
  done();
}

// gulp.task(function css() {
//     return gulp.src('sass/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('./css'));
// });

//gulp.task('default', gulp.parallel(['css']));

gulp.task('default', gulp.series(done => done()));

gulp.watch(['*.html', 'js/*.js', 'jasmine/**/*.js'], gulp.series(reload));
