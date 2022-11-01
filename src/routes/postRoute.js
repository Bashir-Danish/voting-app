import express from "express";
import { catchAsyncError } from "../middleware.js";
import Post from "../models/postModel.js";
import fileUpload from "express-fileupload";
const router = express.Router();

router.get(
    "/all",
    catchAsyncError(async (req, res) => {
      let posts = await Post.find()  
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
      let post = await Post.findById(req.params.id)  
      post.isApprove = true
      post.save() 
      res.status(200).json({
        success: true,
        isApprove: post.isApprove,
      });
    })
);


router.put(
    "/:id",
    catchAsyncError(async (req, res) => {
      let post = await Post.findById(req.params.id)
      post.text = req.body.text ?? post.text;  
      post.isApprove = req.body.isApprove ?? post.isApprove;  
      res.status(200).json({
        success: true,
        post,
      });
    })
);



// router.post("/upload", (req, res) => {
//   let file;
//   try {
//     file = req.files.file;
//     if (!req.files) {
//       return res.status(400).send("No files were uploaded.");
//     }
//     path = __dirname + "/uploads/" + Date.now().toString() + file.name;
//     file.mv(path, function (err) {
//       if (err) return res.status(500).send(err);
//       const updated = await;
//       res.json({
//         message: "File uploaded!",
//         path: "/uploads/" + Date.now().toString() + file.name,
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });


router.delete('/:id', catchAsyncError(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(500).json({
            message:"user not found"
        })
    } else {
        await user.remove();
    
        res.status(200).json({
          success: true,
          message: "User deleted successfully",
        });
      }
}
));


export default router;
