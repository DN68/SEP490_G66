import express from "express";

import{
    showUsers,
    showUserByEmailPassword,
    createUser,
} from "../controllers/user.js"

const router = express.Router();


//get all users
router.get("/users", showUsers);

//get user by username & password
router.get("/user",  showUserByEmailPassword);

//create new user
router.post("/users", createUser);



export default router;