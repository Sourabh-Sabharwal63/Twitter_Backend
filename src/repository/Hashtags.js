const { Hashtags } = require("../models");
const CURD = require("./Curd");
class HashtagsRepository extends CURD {
  constructor() {
    super(Hashtags);
  }
  async getHashtagTweets(tagId) {
    try {
      const response = await Hashtags.findById(tagId).populate("tweets");
      return response;
    } catch (error) {}
  }
  async getHashtagByName(name) {
    try {
      const response = await Hashtags.find({ text: name });
      return response;
    } catch (error) {
      console.log(
        "something went wrong on Repository layer in getHashtagByName"
      );
    }
  }

  async createBulk(data) {
    try {
      const response = await Hashtags.insertMany(data);
      return response;
    } catch (error) {
      console.log("something went wrong on Repository layer in createBulk");
    }
  }
}

module.exports = HashtagsRepository;
