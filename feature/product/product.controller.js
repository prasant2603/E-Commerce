import ProductModel from "./product.model.js"

export default class ProductController{
    getAllProducts(req,res) {
        const products=ProductModel.GetAll();
        res.status(200).send(products);
    }
    
    addProduct(req,res) {
        const { name ,price, sizes } = req.body;
        const newProduct = {
            name, 
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageurl: req.file.filename,
        }
        const createdRecord = ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }

    rateProduct(req,res) {
        const userId = req.query.userid;
        const productId = req.query.productid;
        const rating = req.query.rating;
        const error = ProductModel.rateProduct(userId, productId, rating);
        if(error)
            return res.status(400).send(error);
        return res.status(200).send("Rating Added");
    }

    getOneProduct(req,res) {
        const id = req.params.id;
        const product=ProductModel.get(id);
        if(!product)
            res.status(404).send("Product not found");
        else 
            res.status(200).send(product);
    }

    filterProducts(req,res) {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result=ProductModel.filter(minPrice, maxPrice, category);
        res.status(200).send(result);
    }
}
