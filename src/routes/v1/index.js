const express = require("express");
const router = express.Router();
const Controller = require("../../controller");
const { TweetController, LikeController, RepostsController ,UserController} = Controller;

const authenticate=require("../../middlewares/authmiddleware");
//user Api

router.post("/signUp",UserController.signUp);
router.post("/signIn",UserController.signIn);


//Tweet Api
router.post("/createTweet",authenticate, TweetController.createTweet);
router.delete("/deleteTweet",authenticate, TweetController.deleteTweet);
router.get("/getReposts",authenticate, TweetController.getReposts);
router.get("/getUserAllTweet",authenticate, TweetController.getUserAllTweet);

//Like Api
router.post("/createLike",authenticate, LikeController.createLike);

//Reposts Api
router.post("/createReposts",authenticate, RepostsController.createReposts);
router.get("/getAllUserReposts",authenticate, RepostsController.getAllUserReposts);
module.exports = router;
