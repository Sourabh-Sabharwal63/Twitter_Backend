const express=require("express");
const router=express.Router();
const Controller=require("../../controller");
const {TweetController, LikeController,
  RepostsController}=Controller;

//Tweet Api
router.post("/createTweet",TweetController.createTweet);
router.delete("/deleteTweet",TweetController.deleteTweet);
router.get("/getReposts",TweetController.getReposts);
router.get("/getUserAllTweet",TweetController.getUserAllTweet);

//Like Api
router.post("/createLike",LikeController.createLike);


//Reposts Api
router.post("/createReposts",RepostsController.createReposts);
router.get("/getAllUserReposts",RepostsController.getAllUserReposts);
module.exports=router;