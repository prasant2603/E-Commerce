import { ObjectId } from "mongodb";
import { getDb } from "../../conf/mongodb.js";

export default class ProductRespository {
    async add(product){
        try{
            const db = getDb();
            const collection = db.collection("products");
            return await collection.insertOne(product);
        }
        catch(err){
            throw new Error("Something went wrong",500);
        }
    }
    async get(id){
        try{
            const db = getDb();
            const collection = db.collection("products");
            const objId = new ObjectId(id);
            return await collection.findOne({_id: objId});
        }
        catch(err){
            console.log(err);
            throw new Error("Something went wrong",500);
        }
    }
    async getAll(){
        try{
            const db = getDb();
            const collection = db.collection("products");
            return await collection.find().toArray();
        }
        catch(err){
            throw new Error("Something went wrong",500);
        }
    }
    async filter(minPrice, maxPrice, category){
        try {
            const db = getDb();
            const collection = db.collection("products");
            let filterExpression = {};
            if(minPrice)
                filterExpression.price = {$gte: parseFloat(minPrice)}
            if(maxPrice)
                filterExpression.price = {...filterExpression.price, $lte: parseFloat(maxPrice)}
            if(category)
                filterExpression.category = category
            return await collection.find(filterExpression).toArray();
        } catch (error) {
            throw new Error("Something went wrong",500);
        }
    }
    async rate(userId, productId, rating){
        try {
            const db = getDb();
            const collection = db.collection("products");
            const uid = new ObjectId(userId)
            const product = await collection.findOne({_id: new ObjectId(productId)})
            const userRating = product?.ratings?.find(r => r.userId==userId)
            if(userRating){
                await collection.updateOne(
                    {_id: new ObjectId(productId), "ratings.userId": uid},{
                        $set: {"ratings.$.rating": rating}
                })
            }
            else{
                await collection.updateOne({_id: new ObjectId(productId)},{
                    $push: {ratings : {userId: uid, rating}}
                })
            }
        } catch (error) {
            throw new Error("Something went wrong",500);
        }
    }
}