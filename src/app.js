require('dotenv').config(); 

const express = require('express');
const body_parser = require('body-parser');
const path = require('path');
const session = require('cookie-session');
const methodOverride = require('method-override');
const soyMayorMiddleware = require('./middlewares/soyMayorMiddleware');
const cookieParser = require('cookie-parser');
const rememberMe = require('./middlewares/rememberMe');
const adminSession = require('./middlewares/adminSession');
const createError = require('http-errors');
const cors = require('cors')

const app = express();


app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json({limit: '1mb'}));
app.use(body_parser.urlencoded({extended:true}));

app.use(session ({secret:'aca va una frase secreta, shh!', resave: true, saveUninitialized: true}));
app.use(methodOverride('_method'));
app.use(cookieParser());

/**Middlewares */

// app.use(soyMayorMiddleware); Turn off, annoying while working.
app.use(rememberMe);
app.use(adminSession);
app.use(cors())




/** Rutas */
const mainRouter = require('./routes/main'); // Rutas Main
const productsRouter = require('./routes/products'); // Rutas / Products
const usersRouter = require('./routes/users'); // Rutas / Users
const adminRouter = require('./routes/admin'); // rutas /admin
const cartRouter = require('./routes/cart');
const apiRouterProducts = require('./routes/apis/apiProducts');
const apiRouterUsers = require('./routes/apis/apiUsers');


app.use('/', mainRouter);
app.use('/productos', productsRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/cart', cartRouter);
app.use('/api/users', apiRouterUsers);
app.use('/api/products', apiRouterProducts);

app.use((req, res, next) => next(createError(404)));




// error 
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;