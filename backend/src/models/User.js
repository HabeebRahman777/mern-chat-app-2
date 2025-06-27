import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: ""
    },
    verified: {
      type: Boolean,
      default: false  
    },
    incomingRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    outgoingRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
