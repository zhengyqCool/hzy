const path = require('path')
const config = require('config')
const gulp = require('gulp')
const rev = require('gulp-rev')
const sass = require('gulp-sass')
// const sourcemaps = require('gulp-sourcemaps')
const webpack = require('webpack-stream')
const webpackConfig = config.get('env') === 'development'
  ? require('./build/webpack.dev.conf')
  : require('./build/webpack.prod.conf')


const resolve = function resolve (dir) {
  return path.resolve(__dirname, dir)
}

const stylesPath = {
  src: `${resolve('./src/styles')}/*.scss`,
  dist: resolve('./dist/styles'),
}

const scriptsPath = {
  src: resolve('./src/scripts/pages/*.js'),
  dist: resolve('./dist/scripts'),
}

const imagesPath = {
  src: resolve(`${resolve('./src/static')}/images/**/*.+(png|jpg|jpeg|svg)`),
  dist: resolve('./dist/static/images'),
}

gulp.task('scss', () => {
  gulp.src(stylesPath.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(stylesPath.dist))
})

gulp.task('script', () => {
  gulp.src(scriptsPath.src)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(scriptsPath.dist))
})

gulp.task('copy:images', () => {
  console.log(imagesPath.src)
  gulp.src(imagesPath.src)
    .pipe(gulp.dest(imagesPath.dist))
})

gulp.task('watch', () => {
  gulp.watch(stylesPath.src, ['scss'])

  gulp.watch(imagesPath.src, ['copy:images'])
})

gulp.task('default', ['scss'])
