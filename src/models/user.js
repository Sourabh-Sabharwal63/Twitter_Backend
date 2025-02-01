const mongoose=require("mongoose");
const{model,Schema}=mongoose;

const UserSchema=new Schema({
  name:{type:String},
  email:{type:String},
  password:{type:String}
})

module.exports=model("User",UserSchema);
