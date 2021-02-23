//Modulos
const express = require('express');
const app = express();

//Rutas
const categoriesRouter = require('./routes/categoriesRouter');
const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

//Requiero Session
const session = require('express-session');

//Configuración Ruta de archivos estaticos para que sean públicos.
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
//Modifico donde esta la ubicación de views, por default estaría en site>views
app.set('views','src/views');

//Acá llamo el ruteador donde se colocan todas las rutas.
app.use('/', mainRouter);
app.use('/categorias', categoriesRouter);
app.use('/productos', productsRouter);
app.use('/usuario',usersRouter);

//Uso sessión como middleware
app.use(session ( {secret: "Rápido Confiable y a la puerta de tu hogar"}))


 //Iniciando EJS.
 app.set('view engine', 'ejs');
//Iniciando en puerto 3000 y heroku.
app.listen(process.env.PORT || 3000, () => {
    console.log('Corriendo en puerto 3000');
    console.log();
    console.log('visitar http://localhost:3000');
});





