require('dotenv').config()

const connectDB= require('./db/connect');// connecting to the database one more time

const Product = require('./models/product');

const jsonProducts = require('./products.json');


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Starting the server succefully')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
        
        
    }
}

start()
