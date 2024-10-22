import express from 'express'
import upload from '../middlewares/multer.js';
import { allposts, createpost, likePost, postdelete, readmore } from '../controllers/post.controller.js';
import isauthenticated from '../middlewares/isauthenticated.js';
import { showlikes } from '../controllers/user.controller.js';

const router=express.Router();

router.route("/createpost").post(isauthenticated,upload.single("image"),createpost)   
router.route("/allposts").get(allposts);   // done
router.route("/deletepost/:id").get(isauthenticated,postdelete)
router.route("/likepost/:id").get(isauthenticated,likePost) 
router.route("/showlikes/:id").get(isauthenticated,showlikes) 
router.route("/readmore/:id").get(readmore) 

export default router 