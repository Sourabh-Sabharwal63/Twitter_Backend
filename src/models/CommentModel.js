const mongoose=require("mongoose");

const CommentSchema=new mongoose.Schema({
  content:{type:String},
  onModel:{type:String,enum:["Tweet","Comment"]},
  likeable:{type:mongoose.Types.ObjectId,refPath:"onModel"},
  userId:{type:mongoose.Types.ObjectId,ref:"User"},
  comments:{type:mongoose.Types.ObjectId,ref:"Comment"}
});

module.exports=mongoose.model("Comment",CommentSchema);
