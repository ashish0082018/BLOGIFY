import express from 'express'
import { login, logout, profile, register, userpost } from '../controllers/user.controller.js';
import isauthenticated from '../middlewares/isauthenticated.js';

const router=express.Router();

router.route("/signup").post(register)   // done
router.route("/login").post(login)      // done
router.route("/logout").get(logout)      // done
router.route("/profile").get(isauthenticated,profile);   
router.route("/userpost").get(isauthenticated,userpost);


export default router