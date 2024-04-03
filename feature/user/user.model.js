import { getDb } from "../../conf/mongodb.js";

export default class userModel{
    constructor(name, email, password, type){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.id = users.length+1;
    }
    static signUp(name, email, password, type){
        const newUser = new userModel(name, email, password, type);
        users.push(newUser);
        return newUser;
    }
    static signIn(email, password){
        const user = users.find(
            (u) => u.email==email && u.password==password
        );
        return user;
    }
    static getAll(){
        return users;
    }

}
let users = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin@123",
        type: "admin",
        id: 1
    },
    {
        name: "Seller",
        email: "seller@gmail.com",
        password: "seller@123",
        type: "seller",
        id: 2
    }
]