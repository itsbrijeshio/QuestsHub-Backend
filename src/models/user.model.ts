import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    username: { type: String },
    email: { type: String, unique: true, index: true },
    password: { type: String },
    avatarUrl: { type: String },
    githubId: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
