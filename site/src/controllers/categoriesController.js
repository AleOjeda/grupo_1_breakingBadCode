module.exports = {
    index : (req, res) =>{
        res.send ('Hola estoy en home categorias. Definir vista de index categoria');
    },
    subCategory: (req, res) =>{
        res.send ('Hola estoy en la subcategoria');
    }
};