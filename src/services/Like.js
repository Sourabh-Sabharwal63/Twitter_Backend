const {LikeRepository,TweetRepository}=require("../repository");

class LikeService{
  constructor(likeRepository=new LikeRepository(),tweetRepository=new TweetRepository()){
    this.likeRepository=likeRepository;
    this.tweetRepository=tweetRepository;
  }

  async toggleLike(modelName,modelId,user){
    try {
      if(modelName == "Tweet"){
        var model=await this.tweetRepository.getTweetWithLikes(modelId);
        console.log("model = ",model);
      } 
      else if(modelName=="Comment"){
      }
      else{
        throw new Error("unknown model type ");
      }
      const Exist=await this.likeRepository.findByUserAndLikeable(modelName,modelId,user)
      console.log("isExist = ",Exist);
     if(Exist){
      model.likes.pull(model._id);
      //model.likesCount=model.likesCount+1;
     await model.save();
     await  this.likeRepository.destroy(Exist._id)
      var isAdded=false;
     }
     else{
      const newLike=await this.likeRepository.create({
        onModel:modelName,
        likeable:modelId,
        user:user
      });
      model.likes.push(newLike._id);
      isAdded=true;
     }
      return isAdded;
    } catch (error) {
      console.log("error.message = ",error.message);
      console.log("something went wrong");
       
    }

  }
}

module.exports=new LikeService();