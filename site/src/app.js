//Modulos
const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

//Inicio express
const app = express();

//Middlewares de aplicación
const userLoggedMiddleware = require ('./middlewares/userLoggedMiddleware');

//Configuración Ruta de archivos estaticos para que sean públicos.
app.use(express.static('public'));

//Uso sessión como middleware
app.use(session ( {
    secret: "Shh, it's a secret",
    resave: false,
    saveUninitialized: false,
}))

app.use(cookies());
//Middleware para pasar la variable locals user logged a toda la aplicación. Uso de "locals.xxxx"
app.use(userLoggedMiddleware);

//Para que los métodos POST funcionen (extended:true me permitiría mandar objetos anidados)
app.use(express.urlencoded({ extended: false }));

//Iniciando EJS.
app.set('view engine', 'ejs');
//Modifico donde esta la ubicación de views, por default estaría en site>views
app.set('views','src/views');

//Rutas
const categoriesRouter = require('./routes/categoriesRouter');
const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

app.use('/', mainRouter);
app.use('/categorias', categoriesRouter);
app.use('/productos', productsRouter);
app.use('/usuario',usersRouter);

//Iniciando en puerto 3000 y heroku.
app.listen(process.env.PORT || 3000, () => {
    console.log('Corriendo en puerto 3000');
    console.log();
    console.log('http://localhost:3000');
});