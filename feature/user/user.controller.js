import userModel from "./user.model.js"
import jwt from "jsonwebtoken"

export class userController{
    signUp(req, res) {
        const {name, email, password, type} = req.body;
        const user = userModel.signUp(name,email,password,type);
        res.status(201).send(user);
    }
    signIn(req, res) {
        const data = userModel.signIn(req.body.email, req.body.password);

        if(!data)
            res.status(400).send("Incorrect Credentials");
        else 
        {
            const token = jwt.sign({userId: data.id, email: data.email},"ml3j4XAe2M",{
                expiresIn: "1 hour",
            });
            res.status(201).send(token);
        }   
    }
}