const mongoose=require("mongoose");

const repostsSchema=new mongoose.Schema({
  tweetId:{type:mongoose.Types.ObjectId,ref:"Tweet"},
  userId:{type:mongoose.Types.ObjectId,ref:"User"}
},{timestamps:true})
module.exports=mongoose.model("Reposts",repostsSchema);