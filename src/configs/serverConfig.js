require("dotenv").config();

module.exports={
Port:process.env.Port,
DB_Url:process.env.DB_Url,
SaltRound:process.env.SaltRound,
Signature:process.env.Signature,
}