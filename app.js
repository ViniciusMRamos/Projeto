var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var installRouter = require('./routes/install');
app.use('/api/install', installRouter);

var loginRouter = require('./routes/login')
app.use('/api/login', loginRouter)

var usuarioRouter = require('./routes/usuario');
app.use('/api/usuario', usuarioRouter);

var autorRouter = require('./routes/autor');
app.use('/api/autor', autorRouter);

var editoraRouter = require('./routes/editora');
app.use('/api/editora', editoraRouter);

var livroRouter = require('./routes/livro');
app.use('/api/livro', livroRouter);

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./api_livro_doc.json')

app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


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
  res.json({mensagem: "Ocorreu um erro desconhecido!"});
});

module.exports = app;
