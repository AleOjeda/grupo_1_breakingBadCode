const categories = require('./../database/categories');
const products = require('./../database/products');

const jsonTable = require('../database/jsonTable');
const productsTable = jsonTable('categories');
const db = require('../database/models');
module.exports = {
    index : (req, res) =>{
        res.render ('categories/allCategories',{categories, products});
    },
    subCategory: (req, res) =>{
        let subcategories = [];
        db.Categories.findOne({
                include: [{association: "sub_categories"}],
                where: {path: req.params.id}
            })
            .then ((category) =>{
                    category.sub_categories.forEach(subcategory=>{
                    let subCategoryName = subcategory.sub_category;
                    let subCategoryPath = subcategory.path;
                    subcategories.push([subCategoryName,subCategoryPath])
                    });
                let categoryName = category.category;
                let categoryPath = category.path
                let parametros = [subcategories,categoryName,categoryPath];
                return (parametros); 
            })
             .then((parametros) =>{
                 subcategories = parametros[0];
                let categoryName = parametros[1];
                let categoryPath = parametros[2]
                res.render ('categories/singleCategory',{categories, subcategories, categoryName,categoryPath})
            }) 
    },
    subCategoryProducts: (req,res) => {
        let pathCategoryRequested= req.params.id;
        let pathSubCategoryRequested = req.params.sub_id;
        console.log(pathSubCategoryRequested);
         if (req.params.sub_id == "ver-todo"){
            db.Products
            .findAll({
                include: [
                    {association: "category", where:{path: pathCategoryRequested }},
                    {association: "sub_category"}],
            })
            .then(productsCategory =>{
                //console.log(productsCategory);
                let products = productsCategory;
                let categoryName = productsCategory[0].category.category;
                let subCategoryName = "Ver Todo";
                res.render('categories/productsSubcategory',{categories, products, categoryName, subCategoryName});
            })
            .catch((error) =>{console.log(error)})
        } else{
            db.Products
                .findAll({
                    include: [
                        {association: "category", where:{path: pathCategoryRequested }},
                        {association: "sub_category", where:{path: pathSubCategoryRequested }}],
                })
                .then(productsCategory =>{
                    let products = productsCategory;
                    let categoryName = productsCategory[0].category.category;
                    let subCategoryName = productsCategory[0].sub_category.sub_category;
                    res.render('categories/productsSubcategory',{categories, products, categoryName, subCategoryName});
                })
                .catch((error) =>{console.log(error)})
        }
    }
};