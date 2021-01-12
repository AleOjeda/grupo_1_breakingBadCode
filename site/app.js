const express = require('express');


//Iniciar App:
const app = express();

//Archivos estaticos
app.use(express.static('public'));


//Probando servidor localhost
app.get('/', (req,res) =>{
    res.send('Hello World');
});
//Inicio de Herokuapp
app.listen(process.env.PORT || 3000, function() {
    console.log(`Servidor corriendo en el puerto 3000`);
   });

//Iniciando en puerto 3000.
app.listen(3000, () => {
    console.log('Corriendo en puerto 3000');
    console.log();
    console.log('visitar http://localhost:3000');
});





