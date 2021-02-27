const express = require('express');
const router = express.Router();
//Requiero Multer y path, para almacenar la imagen del producto
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/productsController');

//Configuro ruta de destino de la imagen ... tener en cuenta que el qwerty.com/productos/crear
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname,'../../public/img/productos'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        const newFilename = 'product-'+ Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});
const upload = multer({ storage });


router.get('/', (req,res) => {
    res.redirect('/')
});


router.get('/crear', controller.create); //Muestra formulario de creación
router.get('/editar',controller.edit); // Muestra formulario para editar
router.get('/:id', controller.productDetail);

router.post('/crear', upload.single('imageProduct'), controller.store);

router.post('/editar',upload.single('imageProduct'),controller.update); //Procesa el formulario de creación (agregar multer para los archivos)
module.exports = router;