//Modulos
const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');

//Inicio express
const app = express();

//Middlewares de aplicación
const userLoggedMiddleware = require ('./middlewares/userLoggedMiddleware');
const varsMiddleware = require ('./middlewares/varsMiddleware');

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
app.use(varsMiddleware);
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
const orderRouter = require('./routes/orderRouter');

app.use('/', mainRouter);
app.use('/categorias', categoriesRouter);
app.use('/productos', productsRouter);
app.use('/usuario',usersRouter);
app.use('/pedidos',orderRouter);

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
/////HABILITAR CORS... Cuidado en producción. Colocar antes de las rutas de APIS/////
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}) 
/////HABILITAR CORS... Cuidado en producción/////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////



//Rutas APIs
const apiMyCartRouter = require('./routes/API/myCartRouter');
const apiProductsRouter = require('./routes/API/productsRouter');
const apiCategoriesRouter = require('./routes/API/categoriesRouter');
const apiUsersRouter = require('./routes/API/usersRouter');
//const apiCategories = require('');
app.use('/api/cart', apiMyCartRouter);
app.use('/api/product', apiProductsRouter);
app.use('/api/category', apiCategoriesRouter);
app.use('/api/user', apiUsersRouter);
//app.use('/api/categorias', apiCategories);




//Iniciando en puerto 3000 y heroku.
app.listen(process.env.PORT || 3000, () => {
    console.log('Corriendo en puerto 3000');
    console.log();
    console.log('http://localhost:3000');
});