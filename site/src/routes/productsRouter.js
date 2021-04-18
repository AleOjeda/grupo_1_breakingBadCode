const express = require('express');
const router = express.Router();
//Requiero Multer y path, para almacenar la imagen del producto
const multer = require('multer');
const path = require('path');
const {check} = require('express-validator');
const controller = require('../controllers/productsController');

//Configuro ruta de destino de la imagen ... tener en cuenta que el qwerty.com/productos/crear
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname,'../../public/img/productos'));
    },
    filename: (req, file, cb) => {
        //console.log(file);
        const newFilename = 'product-'+ Date.now() + path.extname(file.originalname) ;
        cb(null, newFilename);
    }
});
//filtro para tipo de imagen, detiene el guardado.
const fileFilter= function (req, file, cb) {
    if (path.extname(file.originalname) == '.png' || path.extname(file.originalname) == '.jpg' || path.extname(file.originalname) == '.jpeg'|| path.extname(file.originalname) == '.gif') {
                return cb(null, true)
    }
    cb(null, false)
}

const upload = multer({ storage, fileFilter });


//Validaciones
const productValidations = [
    check('brand')
        .notEmpty().withMessage('Por favor completar Marca').bail()
        .isLength({min:5}).withMessage('Debe tener un mínimo de 5 caracteres'),
    check('description')
        .notEmpty().withMessage('Por favor completar Descripción').bail()
        .isLength({min:20}).withMessage('Debe tener un mínimo de 20 caracteres'),
    check('image').custom((value, { req }) => {
        let file = req.file;
        let extensions = ['.jpg','.png', '.jpeg', 'gif'];
        if (!file) {
            throw new Error('Debes subir una imágen');
        } else {
            let fileExt = path.extname(file.originalname);
            if (!extensions.includes(fileExt)) {
                    throw new Error(`Solo podes subir archivos en formato: ${extensions.join(', ')}`);
            }
        }
        return true;
    })
]

router.get('/', (req,res) => {
    res.redirect('/')
});



router.get('/crear', controller.create); //Muestra formulario de creación
router.post('/crear', upload.single('image'), productValidations, controller.store);

router.get('/editar/:id',controller.edit); // Muestra formulario para editar
router.post('/editar/:id', upload.single('image'), productValidations, controller.update); //Procesa el formulario de creación (agregar multer para los archivos)

router.get('/remove/:id', controller.remove);

router.get('/:id', controller.productDetail);

module.exports = router;