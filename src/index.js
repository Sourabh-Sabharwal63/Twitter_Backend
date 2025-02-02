const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { Port } = require("./configs/serverConfig");
const { dbStart } = require("./configs/dbConfig");
const Api = require("./routes");

const {LikeRepository,HashtagsRepository,TweetRepository,UserRepository}=require("./repository")
const {LikeService,TweetService}=require("./services");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


async function startServer() {
  await dbStart();

  app.use("/tweet", Api);

  app.listen(Port, async () => {
    console.log(`Server start at port ${Port}`);
  });

  const dummyData = {
    onModel:"Tweet",
    likeable:"679f349f6227abd4b23edb11",
    user:"679e3d78655d94c7cfb971cd"
  };

  
  const response=await LikeService.toggleLike(onModel="Tweet",
    likeable="679f349f6227abd4b23edb11",
    user="679e3d78655d94c7cfb971cd");
   console.log("response = ",response);
 // TweetService.createTweet({content:"DeepSeek crushed the chatgpt #NewAI #ChinaVsUSA",user:"679e3d78655d94c7cfb971cd",likes:["679e3e553204c48c8a02aa7e"]});


//   const likeRepository=new LikeRepository();
//  const response=await likeRepository.getLikeTweetAndUser("679e3e553204c48c8a02aa7e")
  
//  console.log("response = ",response);
  // const tweetRepository=new TweetRepository();
  // const response=await tweetRepository.getAll();
  // console.log("response ",response);
// const hashtagsRepository=new HashtagsRepository();
// const response= await hashtagsRepository.getHashtagTweets("679bc357ccaed192df4df39f");
// console.log("response = ",response);


 // const likeRepository=new LikeRepository();
  //likeRepository.createLike(dummyData);
  //const response= await likeRepository.getLike("679e276ec6b751dddee4aa31");
  //console.log("response = ",response);

}

startServer();
