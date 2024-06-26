const Product = require("../models/product")

const getAllProductsStatic = async (req, res) => {
    const search = 'aaa'
   const products = await Product.find({
    name: {$regex: search, $options : 'i'},
    // getting only one product that matches the name
})// setting up real functionalities
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts = async (req, res) => {
    const {featured, company, name}= req.query// the parameters here must match that of the database.

const queryObject= {}

if(featured){
    queryObject.featured= featured === 'true'? true: false
}

if(company){
    queryObject.company= company
}

if(name){
    queryObject.name= {$regex: name, $options: 'i'}
}
    console.log(queryObject)
    const products= await Product.find(queryObject)
    res.status(200).json({products, nbHits: products.length})

}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}

//including nhbits and analysis of the lines of codes
//query stings params , check agolia api, providing the route params