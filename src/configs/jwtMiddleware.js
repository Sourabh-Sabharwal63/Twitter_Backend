const JWT = require("passport-jwt");
const { User } = require("../models");
const {Signature}=require("./serverConfig")
const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:Signature ,
};

 const passportAuth = (passport) => {
  try {
    console.log("inside strategy");
    console.log("jwtFromRequest = ",opts.jwtFromRequest);
    console.log("Signature ",Signature);
    
    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        console.log("req sent to strategy");
        console.log("jwtFromRequest = ",opts.jwtFromRequest);
        console.log("jwt_payload = ",jwt_payload)
        console.log("jwt_payload._id",jwt_payload._id);
        
        const user = await User.findById(jwt_payload.id);
        if (!user) {
          done(null, false);
        } else {
          done(null, user);
        }
      })
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports={passportAuth};