import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const AuthSchema = new Schema({
  username: {
    type: String
  },
  usergroup: {
    type: String
  },
  email: {
    type: String
  },
  confirmkey: {
    type: String
  },
  passwordHash: { type: String, required: true }
}, { 
  versionKey: false 
})

AuthSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

AuthSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

export const Auth = model("Auth", AuthSchema);