import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is reuired"],
    unique: [true, "username already exists"],
  },
  email: {
    type: String,
    required: [true, "email is reuired"],
    unique: [true, "email already exists"],
  },
  password:{
    type:String,
    required:[true,"enter a pass"]
  },
  verified:{
    type:Boolean,
    default:false,
  }
})
// api for create user

const userModel=mongoose.model("user",userSchema);
export default userModel;