import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    sessionId:{
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true
  }
);


export const Session = mongoose.model("Session", sessionSchema);