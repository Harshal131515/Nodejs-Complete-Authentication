const mongoose= require ('mongoose');
 const connectDB = mongoose.connect("mongodb+srv://harshal1:Harshal13@cluster0.57ni7xf.mongodb.net/Harshal?retryWrites=true&w=majority").then(()=>console.log("succesfully connected.....")).catch((error)=>console.log(error))

module.exports = connectDB;