import jwt from 'jsonwebtoken'
const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token)
        return res.status(401).send("Unauthorized Access");
    else {
        try {
            const payload = jwt.verify(token,"ml3j4XAe2M");
            req.userId=payload.userId;
            console.log(payload); 
        } catch (error) {
            res.status(401).send("Unauthorized Access");
        }
        next();
    }
}
export default jwtAuth;