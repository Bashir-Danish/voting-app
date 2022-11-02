import express from "express";
import { catchAsyncError } from "../middleware.js";
import Post from "../models/postModel.js";
import { fileURLToPath } from "url";
import path from "path";



const router = express.Router();

router.get(
  "/all",
  catchAsyncError(async (req, res) => {
    let posts = await Post.find();
    res.status(200).json({
      success: true,
      posts,
    });
  })
);

router.get(
  "/allPost",
  catchAsyncError(async (req, res) => {
    let posts = await Post.find({ isApprove: true });
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
      text: req.body.text,
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
      text: req.body.text,
      file: req.body.file,
      office: req.body.office,
    });
    res.status(201).json({
      success: true,
      post,
    });
  })
);

// Approve the post

router.put(
  "/:id",
  catchAsyncError(async (req, res) => {
    let post = await Post.findById(req.params.id);
    post.isApprove = true;
    post.save();
    res.status(200).json({
      success: true,
      isApprove: post.isApprove,
    });
  })
);

router.put(
  "/:id",
  catchAsyncError(async (req, res) => {
    let post = await Post.findById(req.params.id);
    post.text = req.body.text ?? post.text;
    post.isApprove = req.body.isApprove ?? post.isApprove;
    res.status(200).json({
      success: true,
      post,
    });
  })
);

router.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    sampleFile = req.files.file;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
      uploadPath = path.join(__dirname, "..", "/uploads/posts/") + Date.now().toString() + sampleFile.name;
      console.log(uploadPath)
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
      res.json({
        message: "File uploaded!",
        path: uploadPath,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete(
  "/:id",
  catchAsyncError(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(500).json({
        message: "post not found",
      });
    } else {
      await post.remove();

      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
      });
    }
  })
);

export default router;
