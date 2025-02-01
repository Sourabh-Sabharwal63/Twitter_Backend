const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tweetSchema = new Schema(
  {
    content: { type: String },
    likes: { type: Number },
    Reposts: { type: Number },
    hashTags: [{ type: String }],
    image: { type: Buffer },
    user:{type:mongoose.Types.ObjectId,ref:"User"}
  },
  { timestamps: true }
);

module.exports = model("Tweet", tweetSchema);
