const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const hashTagsSchema = new Schema(
  {
    text: { type: String, require: true, unique: true },
    tweets: [{ type: Schema.Types.ObjectId ,ref:"Tweet"}],
    Ranking: { type: Number },
  },
  { timestamps: true }
);

module.exports = model("Hashtags", hashTagsSchema);
