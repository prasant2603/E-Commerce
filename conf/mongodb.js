import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DB_URL;

let clientInstance;
export const connectToMongoDb = ()=>{
    MongoClient.connect(url).then((client)=>{
        clientInstance=client;
        console.log("MongoDb Connected");
    }).catch(err => {
        console.log(err);
    })
}   
export const getDb = ()=>{
    return clientInstance.db();
}

