import express from "express";
import { catchAsyncError } from "../middleware.js";
import Post from "../models/postModel.js";

const router = express.Router();

router.get(
  "/all",
  catchAsyncError(async (req, res) => {
    let posts;
    let filter = {};
    if (req.query.category) filter.category = req.query.category;
    filter.isApprove = req.query.isApprove ?? true;
    posts = await Post.find(filter)
      .select({ text: 0 })
      .populate("office category province district");
    res.status(200).json({
      success: true,
      posts,
    });
  })
);
router.get(
  "/slider",
  catchAsyncError(async (req, res) => {
    let posts = await Post.aggregate([
      { $match: { isApprove: true } },
      { $sample: { size: 5 } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {$unwind: '$category'},
      {
        $project: {
          _id: 1,
          title: 1,
          file: 1,
          createdAt: 1,
          category: "$category",
        },
      },
    ]);
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

router.get(
  "/:id",
  catchAsyncError(async (req, res) => {
    let post = await Post.find({ _id: req.params.id }).populate(
      "office category province district"
    );

    res.status(200).json({
      success: true,
      posts: post,
    });
  })
);
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
