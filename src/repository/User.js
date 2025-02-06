const {User}=require("../models");
const CURD=require("./Curd");
class UserRepository extends CURD{
  constructor(){
    super(User);
  }
  
  async getUserByEmail(email){
    try {
      const user=await User.findOne({email:email});
      return user;
    } catch (error) {
      console.log("Something went wrong in Repository layer in getUserByEmail",err.message);
      throw error;
    }
  }

  async getUserByUserName(userName){
    try {
      const user=await User.findOne({userName:userName});
      return user; 
    } catch (error) {
      console.log("Something went wrong in Repository layer in getUserByUserName",err.message);
      throw error;
    }
  }
}

module.exports=UserRepository;