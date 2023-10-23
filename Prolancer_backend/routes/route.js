import express from "express";

import{
    showUsers,
    showUserByUserPassword,
    createUser,
} from "../controllers/user.js"

const router = express.Router();


//get all users
router.get("/users", showUsers);

//get user by username & password
router.get("/user",  showUserByUserPassword);

//create new user
router.post("/users", createUser);



export default router;