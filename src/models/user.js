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
    const salt = await bcrypt.genSalt(SaltRound);
    const plainPassword = this.password;
    bcrypt.hash(plainPassword, salt);
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
        email: this.email,
        userName: this.userName,
        password: this.password,
      },
      Signature
    );
  } catch (error) {
    throw error;
  }
};

module.exports = model("User", UserSchema);
