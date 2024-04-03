import CartModel from "./cart.model.js";

export default class CartController{
    addItem(req, res) {
        const {productId, quantity} = req.query;
        const userId = req.userId;
        const error = CartModel.addItem(productId, userId, quantity);
        if(error)
            res.status(400).send(error);
        else {
            res.status(200).send({productId, userId, quantity});
        }
    }
    getItem(req, res) {
        const userId = req.userId;
        console.log(userId);
        return res.status(200).send(CartModel.getItem(userId));
    }
    delete(req, res) {
        const id = req.params.id;
        const userId = req.userId;
        const error = CartModel.delete(id, userId);
        if(error)
            res.status(404).send(error);
        else 
            res.status(200).send("Delete Success");
    }
}