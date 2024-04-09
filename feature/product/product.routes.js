import express from "express";
import ProductController from "./product.controller.js";
import {upload} from "../middlewares/fileupload.middleware.js"

const productController = new ProductController();

const productRouter = express.Router();
productRouter.get("/",
    (req,res) => {
        productController.getAllProducts(req,res); });
productRouter.post("/",
    upload.single('imageUrl'),
    (req,res)=>{
        productController.addProduct(req,res); });
productRouter.get("/filter",(req,res)=>productController.filterProducts(req,res));
productRouter.get("/:id",(req,res)=>productController.getOneProduct(req,res));
productRouter.post("/rate",(req,res)=>productController.rateProduct(req,res));

export default productRouter;