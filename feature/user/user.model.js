export default class userModel{
    constructor(name, email, password, type){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
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