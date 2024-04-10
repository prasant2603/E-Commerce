import { ObjectId } from "mongodb";
import { getDb } from "../../conf/mongodb.js"
export default class CartRepository{
    async addItem(cart){
        try {
            const db = getDb();
            const collection = db.collection("carts");
            const cartItem = await collection.findOne({productId: cart.productId, userId: cart.userId})
            if(cartItem)
                return await collection.updateOne({productId: cart.productId, userId: cart.userId},{
                    $set: {"quantity": cart.quantity}});
            return await collection.insertOne(cart);
        } catch (error) {
            throw new Error("Something went wrong",500)
        }
    }
    async getItem(userId) {
        try {
            const db = getDb();
            const collection = db.collection("carts");
            return await collection.find({userId: userId}).toArray();
        } catch (error) {
            throw new Error("Something went wrong",500)
        }
    }
    async delete(id) {
        try {
            const db = getDb();
            const collection = db.collection("carts");
            return await collection.deleteOne({_id: new ObjectId(id)});
        } catch (error) {
            throw new Error("Something went wrong",500)
        }
    }
}