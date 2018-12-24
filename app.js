var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require('i18n');

var app = express();

// configuración del módulo multilenguaje i18n 
i18n.configure({
  locales:['es', 'en'],
  defaultLocale: 'es',
  directory: __dirname + '/locales'
});

// Por defecto se usa el 'accept-language' header para especifical el setting del lenguaje 
app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Conectamos a la base de datos y definimos los modelos
require('./lib/connectMongoose');
require('./models/Anuncio');
require('./models/Usuario');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.tituloWebSite = 'Nodepop';

/**
 * Rutas de mi API
 */
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));

/**
 * Rutas de mi aplicación web
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
