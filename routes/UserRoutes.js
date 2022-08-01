const express= require ("express");
const router = express.Router();
const UserController= require ('../controllers/usercontroller');
const checkUserAuth = require ('../middleware/auth_middleware')
// Route Level Middleware
router.use('/changepassword',checkuserAuth)


// Public Routes
 router.post('/register',UserController.userRegistration);
 router.post('/login',UserController.userLogin);

 router.get('/get',UserController.getData)

//Protected Routes
router.post('/changepassword',UserController.changeUserpassword)
module.exports= router;