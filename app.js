const express = require('express')
const app = express();
const cors= require('cors')
const connection = require('./config/connectdb')
const UserRoutes = require('./routes/UserRoutes.js')
require('dotenv').config;


// CORS POLICY

app.use(cors())

//CONNECT DATABASE
connection;
//JSON
app.use(express.json())
// LOAD ROUTES
app.use("/api/user",UserRoutes)
const Port =3000;
app.listen(Port, () => {
  console.log("server listening at " +Port);
});