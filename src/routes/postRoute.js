import express from "express";
import { catchAsyncError } from "../middleware.js";
import Post from "../models/postModel.js";

const router = express.Router();

router.get(
  "/all",
  catchAsyncError(async (req, res) => {
    let posts = await Post.find()
      .select({ text: 0 })
      .populate("office category province district");

    res.status(200).json({
      success: true,
      posts,
    });
  })
);

router.get(
  "/:id",
  catchAsyncError(async (req, res) => {
    let post = await Post.findOne({ _id: req.params.id }).populate(
      "office category province district"
    );

    res.status(200).json({
      success: true,
      post,
    });
  })
);

router.get(
  "/allPost",
  catchAsyncError(async (req, res) => {
    let posts;
    let filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
      filter.isApprove = true;
    }
    posts = await Post.find(filter)
      .select({ text: 0 })
      .populate("office category province district");

    posts = await Post.find();
    res.status(200).json({
      success: true,
      posts,
    });
  })
);

router.post(
  "/admin/add",
  catchAsyncError(async (req, res) => {
    let post = await Post.create({
      title: req.body.title,
      text: req.body.text,
      file: req.body.file,
      office: req.body.office,
      category: req.body.category,
      province: req.body.province,
      district: req.body.district,
      isApprove: true,
    });
    res.status(201).json({
      success: true,
      post,
    });
  })
);

router.post(
  "/user/add",
  catchAsyncError(async (req, res) => {
    let post = await Post.create({
      title: req.body.title,
      text: req.body.text,
      file: req.body.file,
      office: req.body.office,
      category: req.body.category,
      province: req.body.province,
      district: req.body.district,
      user: req.body.user,
    });
    res.status(201).json({
      success: true,
      post,
    });
  })
);

// Approve the post

// router.put(
//   "/:id",
//   catchAsyncError(async (req, res) => {
//     let post = await Post.findById(req.params.id);
//     post.isApprove = true;
//     post.save();
//     res.status(200).json({
//       success: true,
//       isApprove: post.isApprove,
//     });
//   })
// );

router.put(
  "/:id",
  catchAsyncError(async (req, res) => {
    let post = await Post.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      post,
    });
  })
);

router.delete(
  "/:id",
  catchAsyncError(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(500).json({
        message: "post not found",
      });
    } else {
      await post.deleteOne();

      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
    }
  })
);

export default router;
