import userModel from "./user.model.js"
import jwt from "jsonwebtoken"
import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async signUp(req, res) {
        try{
            const {name, email, password, type} = req.body;
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = new userModel(name, email, hashPassword, type);
            await this.userRepository.signUp(newUser);
            return res.status(201).send(newUser);
        }
        catch(err){
            throw new Error(`Error: ${err}`,500);
        }
    }
    async signIn(req, res) {
        const user = await this.userRepository.findByEmail(req.body.email);
        if(!user)
            return res.status(400).send("Incorrect Credentials");

        const check = await bcrypt.compareSync(req.body.password, user.password); 

        if(!check)
            res.status(400).send("Incorrect Credentials");
        else 
        {
            const token = jwt.sign({userId: user._id, email: user.email},
                process.env.JWT_SECRET,{
                expiresIn: "1 hour",
            });
            res.status(201).send(token);
        }   
    }
}