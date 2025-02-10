const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcrypt");
const { SaltRound, Signature } = require("../configs/serverConfig");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  userName: { type: String },
  email: { type: String },
  password: { type: String },
});

UserSchema.pre("save", async function (next) {
  try {
    console.log("SaltRound = ", typeof Number(SaltRound));
    const salt = await bcrypt.genSalt(Number(SaltRound));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.ComparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

UserSchema.methods.createJwt = async function () {
  try {
    return jwt.sign(
      {
        id: this._id,
      },
      Signature
    );
  } catch (error) {
    throw error;
  }
};

module.exports = model("User", UserSchema);
