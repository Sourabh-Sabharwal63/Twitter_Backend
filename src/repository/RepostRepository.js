const { Reposts } = require("../models");
const CURD = require("./Curd");
class RepostsRepository extends CURD {
  constructor() {
    super(Reposts);
  }

  async findAllWithUserID(userId) {
    try {
      const list = await Reposts.find({ userId: userId });
      console.log("Reposts = ", list);
      return list;
    } catch (error) {
      console.log("error.message = ", error.message);
    }
  }

  async findAllWithTweetID(tweetId) {
    try {
      const list = await Reposts.find({ tweetId: tweetId });
      console.log("Reposts = ", list);
      return list;
    } catch (error) {
      console.log("error.message = ", error.message);
    }
  }

  async destroyAllRepostsWithTweetId(Id) {
    try {
      const response = await Reposts.deleteMany({ tweetId: Id });
      return response;
    } catch (error) {
      console.log(
        "something went wrong on Repository layer in destroyAllRepostsWithTweetId",
        error.message
      );
      throw error;
    }
  }
}

module.exports = RepostsRepository;
