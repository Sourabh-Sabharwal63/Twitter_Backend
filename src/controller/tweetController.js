const {TweetService}=require("../services");

const createTweet=async (req,res)=>{
  try {
    const response=await TweetService.createTweet(req.body);
    res.status(200).json({
      data:response,
      success:true,
      message:"user created successfully"
    });
  } catch (error) {
    res.status(500).json({
      error:error.message,
      success:false,
      message:"unable to create User"
    })
  }
}

module.exports={
  createTweet
}