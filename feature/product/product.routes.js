import express from "express";
import ProductController from "./product.controller.js";
import {upload} from "../middlewares/fileupload.middleware.js"

const productController = new ProductController();

const productRouter = express.Router();
productRouter.get("/",productController.getAllProducts);
productRouter.post("/",
    upload.single('imageUrl'),
    productController.addProduct);


productRouter.get("/filter",productController.filterProducts);
productRouter.get("/:id",productController.getOneProduct);
productRouter.post("/rate",productController.rateProduct);

export default productRouter;