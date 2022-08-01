const { Password } = require("@mui/icons-material");
const jwt=require("jsonwebtoken")
const models=('../models/user.js')

var checkuserAuth= async(req,res, next)=>{
    let token;
    const{authorization}=req.headers
    if(authorization && authorization.startswith(Bearer)){
        try {
            // Get token from header
            token=authorization.split('')[1]

            //verify token
            const{userId}=jwt.verify(token, process.env.JWT_SECRET_KEY)

            // Get user from token
        
            req.user = await models.findById(userId).select(-Password)
            next()       
        } catch (error) {
            console.log('error')
            res.status(401).send({"status":"failed","message":"Unauthorized user"})
            
            
        }
    if(!token){
        res.status(401).send({"status":"failed","message":"Unauthorized user, No token"})
    }
    }
}
module.exports = checkuserAuth;
