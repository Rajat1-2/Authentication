import mongoose, { Mongoose } from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "enter email"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    otp: {
      type: String,
      required: [true, "enter otp for verification"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, // Expires after 300 seconds (5 minutes)
    },
  },
//   {
//     timestamps: true,
//   }
);
const otpmodel=mongoose.model("OTP",otpSchema);
export default otpmodel;