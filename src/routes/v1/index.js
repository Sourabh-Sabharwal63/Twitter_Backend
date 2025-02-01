const express=require("express");
const router=express.Router();
const TweetController=require("../../controller/tweetController.js");


router.post("/createTweet",TweetController.createTweet);

module.exports=router;