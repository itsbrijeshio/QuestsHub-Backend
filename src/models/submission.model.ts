import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    quest: { type: String, ref: "Quest", required: true },
    user: { type: String, ref: "User", required: true },
    githubRepo: { type: String, required: true },
    comment: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
    score: { type: Number, default: 0 },
    feedback: { type: String },
  },
  { timestamps: true }
);

submissionSchema.index({ quest: 1, user: 1 }, { unique: true });

export default mongoose.model("Submission", submissionSchema);
