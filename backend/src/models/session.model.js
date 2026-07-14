import mongoose, { mongo } from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user is required"],
    },
    refreshTokenHash: {
      type: String,
      required: [true, "refresh hash is reqiuired"],
    },
    //   user ka ip kya chl rha h
    ip: {
      type: String,
      required: [true, "ip is reqiuired"],
    },
    //   broweser ki string client konsa browser use kr rha
    userAgent: {
      type: String,
      required: [true, "agent is reqiuired"],
    },
    //
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const sessionModel=mongoose.model("sessions",sessionSchema)
export default sessionModel;