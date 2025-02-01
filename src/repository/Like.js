const { Like } = require("../models");
const CURD=require("./Curd");
class LikeRepository extends CURD  {
  constructor(){
    super(Like);
  }
  

  async getLikeTweetAndUser(likeId) {
    try {
      const response = await Like.findById(likeId).populate("likeable").populate("user");
      return response;
    } catch (error) {
      throw error;
    }
  }
}


module.exports = LikeRepository;
