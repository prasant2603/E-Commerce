import { getDb } from "../../conf/mongodb.js";

class UserRepository {
    async signUp(newUser){
        try{
            const db = getDb();
            const collection = db.collection("users");
            return await collection.insertOne(newUser);
        }
        catch(err){
            throw new Error("Something went wrong",500);
        }
    }
    async signIn(email, password){
        try{
            const db = getDb();
            const collection = db.collection("users");
            return await collection.findOne({email, password});
        }
        catch(err){
            throw new Error("Something went wrong",500);
        }
    }
    async findByEmail(email) {
        try{
            const db = getDb();
            const collection = db.collection("users");
            return await collection.findOne({email});
        }
        catch(err){
            throw new Error("Something went wrong",500);
        }
    }
}
export default UserRepository;