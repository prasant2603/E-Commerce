import CartModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";

export default class CartController{
    constructor(){
        this.cartRepository = new CartRepository();
    }
    async addItem(req, res) {
        try {
            const {productId, quantity} = req.body;
            const userId = req.userId;   
            const cart = new CartModel(productId, userId, quantity);
            await this.cartRepository.addItem(cart);
            res.status(201).send(cart);
        } catch (error) {
            console.log(error);
            throw new Error("Something went Wrong",500);
        }
    }
    async getItem(req, res) {
        try {
            const userId = req.userId;
            const items = this.cartRepository.getItem(userId);
            return res.status(200).send(items);    
        } catch (error) {
            console.log(error);
            throw new Error("Something went Wrong",500);
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;
            await this.cartRepository.delete(id);
            res.status(200).send("Delete Success");
        } catch (error) {
            console.log(error);
            throw new Error("Something went Wrong",500);
        }
    }
}