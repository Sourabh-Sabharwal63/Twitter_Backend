const {User}=require("../models");
const CURD=require("./Curd");
class UserRepository extends CURD{
  constructor(){
    super(User);
  }
  // async createUser(data){
  //   try {
  //     const user=await User.create(data);
  //     return user;
  //   } catch (error) {
  //     throw error;
  //   }
  // } 
}

module.exports=UserRepository;