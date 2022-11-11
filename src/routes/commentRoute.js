import express from "express";
import { catchAsyncError } from "../middleware.js";
import Comment from "../models/commentModel.js";

const router = express.Router();

// comment
router.post(
  "/add",
  catchAsyncError(async (req, res) => {
    try {
      let comment = await Comment.create({
        text: req.body.text,
        post: req.body.postId,
        user: req.body.userId,
      });
      comment = await comment.populate("user");
      res.status(201).json({
        success: true,
        comment,
      });
    } catch (error) {
      console.log(error);
    }
  })
);

router.get(
  "/all",
  catchAsyncError(async (req, res) => {
    const { postId } = req.query;
    let comments = await Comment.find({ post: postId }).populate("user", {
      _id: 1,
      name: 1,
    });
    res.status(200).json({
      success: true,
      comments,
    });
  })
);
router.delete(
  "/:id",
  catchAsyncError(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await comment.deleteOne();
    res.status(200).json({
      success: true,
      message: "comment deleted successfully",
    });
  })
);

router.put(
  "/:id",
  catchAsyncError(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comment.text = req.body.text ?? comment.text;
    await comment.save();
    res.status(200).json({
      success: true,
      comment,
      message: "comment updated successfully",
    });
  })
);
export default router;
