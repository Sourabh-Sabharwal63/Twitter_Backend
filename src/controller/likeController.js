const {LikeService}=require("../services");

const createLike=async(req,res)=>{
  try {
    console.log("req.query = ",req.query);
    const {modelName,modelID}=req.query;
   const userId="679e3d78655d94c7cfb971cd";
    const response=await LikeService.toggleLike(modelName,modelID,userId);
    const stat=response? "Like is done" :"Like is removed";

    res.status(200).json({
      message:stat,
      success:true
    })
  } catch (error) {
    console.log("error = ",error.message);
    res.status(500).json({
      message:"something went wrong",
      success:false
    })
  }
}

module.exports={createLike};