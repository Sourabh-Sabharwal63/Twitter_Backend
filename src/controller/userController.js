const {Signature}=require("../configs/serverConfig");
const jwt=require("jsonwebtoken");


const signUp=async(req,res)=>{
  try {
    const {email,userName,password}=req.body;
    const response=await userService.signUp(email,userName,password);
    res.status(200).json({
      message:"User created successfully ",
      success:true
    }) 
  } catch (error) {
    res.status(500).json({
      error:error.message,
      message:"something went wrong",
      success:false
    })
  }
}





module.exports={signUp};