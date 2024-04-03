import express from "express";
import bodyParser from "body-parser";
import productRouter from "./feature/product/product.routes.js";
import userRouter from "./feature/user/user.routes.js";
// import basicAuthorizer from "./feature/middlewares/basicAuth.middleware.js";
import jwtAuth from "./feature/middlewares/jwtAuth.middleware.js";
import cartRouter from "./feature/cart/cart.routes.js";
import swagger, { serve } from "swagger-ui-express";
import apiDocs from "./swagger.json" assert {type: 'json'};
import cors from "cors";
import loggerMiddleware from "./feature/middlewares/logger.middleware.js";
import {connectToMongoDb} from "./conf/mongodb.js";

const server = express()

const corsOptions = {
    origin: "*",
    allowedHeaders: "*",
}

server.use(bodyParser.json())
server.use(cors(corsOptions));
server.use(loggerMiddleware)
server.get("/",(req, res)=>{
    res.send("Welcome to e-com Api Server")
})
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs))
server.use('/api/products', jwtAuth, productRouter)
server.use('/api/users',userRouter)
server.use('/api/carts',jwtAuth, cartRouter)
server.listen(8080,()=>{
    console.log("Server is running....")
    connectToMongoDb();
})