import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, index: true },
    password: { type: String },
    avatarUrl: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
