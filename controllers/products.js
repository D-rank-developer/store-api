const Product = require("../models/product")

const getAllProductsStatic = async (req, res) => {
    const search = 'aaa'
   const products = await Product.find({price:{$gt:30}}).sort('name').select('name, price')
  res.status(200).json({products, nbHits: products.length})
}
// getting only one product that matches the name
// setting up real functionalities

const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields,numericFilters}= req.query// the parameters here must match that of the database.

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

if (numericFilters){
    const operatorMap ={
        '>': '$gt',
        '>=': '$gte',
        '<': '$lt',
        '<=': '$lte',
        '=': '$eq',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;///passing the regular expression
    let filters= numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
    console.log(filters)
    const options =['price', 'rating']
    filters= filters.split(','). forEach((items)=>{
        const[field,operator,value]= items.split('-') // array destructuring
        if(options.includes(field)){
            queryObject[field]= {[operator]: Number(value)}
        }
    })

}
    console.log(queryObject)
    
    let result  =  Product.find(queryObject)
    if(sort){
        const sortList= sort.split(',').join('')
       result= result.sort(sortList)
    }else{
        result= result.sort('createAt')
    }
    if(fields){
        const fieldsList = fields.split(',').join('')
        result= result.select(fieldsList)
    }
    const page= Number(req.query.page) || 1
    const limit= Number(req.query.limit) || 10
    const skip= (page-1)*limit;

    result= result.skip(skip).limit(limit)
    // dividing the items into pages, the above logic
    const products= await result
    res.status(200).json({products, nbHits: products.length})

}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}

//including nhbits and analysis of the lines of codes
//query stings params , check agolia api, providing the route params