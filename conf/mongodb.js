import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/ecomdb";

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

