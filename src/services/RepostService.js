const {RepostsRepository}=require("../repository");

class RepostsService {
  constructor(repostsRepository=new RepostsRepository()){
    this.repostsRepository=repostsRepository;
  }
  
  async createReposts(data){
   try {
    const response=await this.repostsRepository.create(data);
    return response;
   } catch (error) {
    console.log(error.message);
    throw error;
   }
  }
  
  async getAllUserReposts(userId){
    try {
      const list=await this.repostsRepository.findAllWithUserID(userId);
      return list;
    } catch (error) {
      console.log("something went wrong on service layer in getAllUsersREposts");
      throw error;
    }
  }

}

module.exports=new RepostsService();