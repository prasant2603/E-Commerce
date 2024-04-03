import express from "express";
import CartController from "./cart.controller.js";

const cartController = new CartController();

const cartRouter = express.Router();
cartRouter.post("/addItem",cartController.addItem);
cartRouter.get("/getitems",cartController.getItem);
cartRouter.delete("/:id",cartController.delete);
export default cartRouter;