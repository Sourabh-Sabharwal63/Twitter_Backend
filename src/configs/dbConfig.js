const mongoose=require("mongoose");
const{DB_Url}=require("./serverConfig");


async function dbStart(){
await   mongoose.connect(DB_Url);
console.log("Db is connected successfully");
}

module.exports={dbStart}