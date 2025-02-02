const { Like } = require("../models");
const CURD=require("./Curd");
class LikeRepository extends CURD  {
  constructor(){
    super(Like);
  }
  
  async findByUserAndLikeable(modelName,modelId,user){
    try {
      const response=await Like.findOne({user:user,likeable:modelId,onModel:modelName})
      return response;
    } catch (error) {
      console.log("error.message = ",error.message);
      throw error;
    }
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
