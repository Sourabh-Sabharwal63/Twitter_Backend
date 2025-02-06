const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const tweetSchema = new Schema(
  {
    content: { type: String, required: true },

    hashTags: [{ type: String }],
    image: { type: Buffer },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "Like" }],
    parentTweet: { type: mongoose.Types.ObjectId, ref: "tweet" },
    childTweet: [{ type: mongoose.Types.ObjectId, ref: "tweet" }],
  },
  { timestamps: true }
);


module.exports = model("Tweet", tweetSchema);
