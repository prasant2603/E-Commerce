import ProductModel from "./product.model.js"
import ProductRepository from "./product.repository.js"

export default class ProductController{
    constructor(){
        this.productRespository = new ProductRepository();
    }
    async getAllProducts(req,res) {
        const products = await this.productRespository.getAll();
        res.status(200).send(products);
    }
    
    async addProduct(req,res) {
        const { name ,price, sizes } = req.body;
        const newProduct = new ProductModel(
            name,
            parseFloat(price),
            sizes.split(','),
            req.file.filename,
        );
        await this.productRespository.add(newProduct);
        res.status(201).send(newProduct);
    }

    async rateProduct(req,res) {
        try{
            const userId = req.userId;
            const productId = req.body.productId;
            const rating = req.body.rating;
            await this.productRespository.rate(userId, productId, rating);
            return res.status(200).send("Rating Added");
        }
        catch(error){
            throw new Error("Something went wrong",500);
        }
    }

    async getOneProduct(req,res) {
        const id = req.params.id;
        const product = await this.productRespository.get(id)
        if(!product)
            res.status(404).send("Product not found");
        else 
            res.status(200).send(product);
    }

    async filterProducts(req,res) {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = await this.productRespository.filter(minPrice, maxPrice, category);
        res.status(200).send(result);
    }
}