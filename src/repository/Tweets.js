const { Tweet } = require("../models");
const CURD=require("./Curd");
class TweetRepository extends CURD{
  constructor(){
    super(Tweet);
  }
  
  async getTweet(tweetId) {
    try {
      const response = await Tweet.findById(tweetId).populate("user");
      return response;
    } catch (error) {
      console.log("something went wrong on TweetRepository in getTweet");
    }
  }

  // async getAllTweet() {
  //   try {
  //     const tweetList = await Tweet.find().populate("user");
  //     return tweetList;
  //   } catch (error) {
  //     console.log("something went wrong on TweetRepository in getAllTweet");
  //   }
  // }

}
 
 

module.exports = TweetRepository;
