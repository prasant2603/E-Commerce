import express from "express";
import CartController from "./cart.controller.js";

const cartController = new CartController();

const cartRouter = express.Router();
cartRouter.post("/addItem",(req,res)=>cartController.addItem(req, res));
cartRouter.get("/",(req,res)=>cartController.getItem(req, res));
cartRouter.delete("/:id",(req,res)=>cartController.delete(req, res));
export default cartRouter;