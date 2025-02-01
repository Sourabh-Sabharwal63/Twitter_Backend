const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const likeSchema = new Schema({
  onModel: { type: String, enum: ["Comment", "Tweet"] },
  likeable: { type: mongoose.Types.ObjectId, refPath: "onModel" },
  user: { type:mongoose.Types.ObjectId,ref:"User"}
},{timestamps:true});
module.exports = model("Like", likeSchema);
