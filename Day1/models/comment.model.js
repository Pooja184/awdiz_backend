import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }]
  },
  { timestamps: true }
);

export const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
