import userModel from "../user/user.model.js";

const basicAuthorizer = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader)
        res.status(401).send("No Authrization Headers");
    const base64Credentials = authHeader.replace('Basic ','');
    console.log(base64Credentials);
    const decodedCred = Buffer.from(base64Credentials,'base64').toString('utf-8');
    console.log(decodedCred);
    const credts = decodedCred.split(':');

    const user = userModel.getAll().find(
        (user) => user.email==credts[0] && user.password==credts[1]
    );
    if(!user)
        res.status(401).send("Incorrect Credentials")
    else 
        next();
}
export default basicAuthorizer;