const models = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 const JWT_SECRET_KEY="Harshal123"


class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    const user = await models.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email already exist" });
    } else {
      if (name && email && password && password_confirmation && tc) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(password, salt);
            const doc = new models({
              name: name,
              email: email,
              password: hashpassword,
              tc: tc,
            });
            await doc.save();
            const user= await models.findOne({email:email})
            const token= jwt.sign({userID: user._id},
              JWT_SECRET_KEY,{expiresIn:'15d'})
          res.status(201).send({ status: "success", message: "Registered Succesfully" ,"token": token})
        
          } catch (error) {
            console.log(error);
            res.send({ status: "failed", message: "Unable to register" })
          }
        } else {
          res.send({
            status: "failed",
            message: "Password and password confirmation does not match",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "All fields are required to fill",
        });
      }
    }
  }
  static userLogin= async(req,res)=>{
    try {
      const{email,password}= req.body;
      if(email && password){
        const user = await models.findOne({ email: email })
        if(user != null){
         const isMatch = await bcrypt.compare(password, user.password)
         if((user.email=== email) && isMatch){
          //Genereating JWT token
          const token= jwt.sign({userID: user._id},
            JWT_SECRET_KEY,{expiresIn:'15m'})
        res.status(201).send({ status: "success", message: "Login Succesfully" ,"token": token})

         }else{
          res.send({"status":"failed","message":"Email or Password does not match"})
         }
        }else{
          res.send({"status":"failed","message":"You are not Registered user"})
        }
      }else{
        res.send({"status":"failed","message":"All fields are required"})
      }

    } catch (error) {
      console.log(error)
      res.send({"status":"failed","message":"Unable to Login"})
    }
  }
  static getData=async (req,res)=>{
    try {
      const data=await models.find();
      res.status(200).json(data)
    } catch (error) {
      res.send(error)
    }
}
static changeUserpassword= async(req,res)=>{
  const{password ,password_confirmation}=req.body
  if(password && password_confirmation){
    if(password!== password_confirmation){
   res.send({"status":"failed","message":"New password and confirm password does not match"})
    }else{
      const salt= await bcrypt.genSalt(10)
      const newhashpassword = await bcrypt.hash(password, salt);
    }

  }else{
    res.send({"status":"failed","message":"All field are required"})
  }
}

}


module.exports= UserController;
