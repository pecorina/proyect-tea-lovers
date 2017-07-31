var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');

//concatena nuestros archivos js convirtiendolos en script.js el q guardara en una carpeta dist.- el q sera linkeado al html
gulp.task('script', function(){
    gulp.src(['node_modules/jquery/dist/jquery.js','node_modules/bootstrap-css/dist/js/bootstrap.js',
        'assets/js/*.js'])
    .pipe(concat('script.js'))
    //carpeta dist
    .pipe(gulp.dest('dist/js'));
});
//concatenara y minificara nuestro archivo main.scss convirtiendolo en style.min.css el q guardara en carpeta dist, sera elq finalmente linkearemos al html.-
gulp.task('style',function(){
    gulp.src(['node_modules/bootstrap-css/dist/css/bootstrap.css', 'assets/sass/main.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css/'));
});
//webserver nos crea un servidor web de desarrollo q se ejecuta en localhost puerto 8000 
gulp.task('webserver',function(){
    gulp.src('../proyect-tea-lovers/')//se posisiona en la carpeta del proyecto
    .pipe(webserver({
        fallback:'index.html',
        livereload: true,
        directoryListing: false,
        open: true,
    }));
});
//le indicaremos a gulp cuales son las tareas q deberan ejecutar al hacer correr el comando GULP en la terminal//
gulp.task('default', ['script','style', 'webserver']);