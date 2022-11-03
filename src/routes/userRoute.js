import express from "express";
import { catchAsyncError } from "../middleware.js";
import User from "../models/usersModel.js";
import { fileURLToPath } from "url";
import path from "path";

const router = express.Router();

router.post(
  "/signup",
  catchAsyncError(async (req, res) => {
    const { name, lastName, email, phone, province, district } = req.body;

    let user = await User.create({
      name,
      lastName,
      email,
      phone,
      province,
      district,
    });
    res.status(201).json({
      success: true,
      user,
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
      uploadPath = path.join(__dirname, "..", "/uploads/profiles/") + Date.now().toString() + sampleFile.name;
  
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

router.get(
  "/all",
  catchAsyncError(async (req, res) => {
    let users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  })
);

// login
router.get(
  "/:phoneNum",
  catchAsyncError(async (req, res) => {
    const user = await User.find({ phone: req.params.phoneNum });
    console.log(user)
    let code = 200;
    let message = true;
    if (!user) {
      code = 404;
      message = false;
    }
    res.status(code).json({
      success: message,
      user
    });
  })
);

router.delete(
  "/:id",
  catchAsyncError(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(500).json({
        message: "user not found",
      });
    } else {
      await user.remove();

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    }
  })
);

router.put(
  "/:id",
  catchAsyncError(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(500).json({
        message: "user not found",
      });
    } else {
      user.name = req.body.name ?? user.name;
      user.lastName = req.body.lastName ?? user.lastName;
      user.email = req.body.email ?? user.email;
      user.phone = req.body.phone ?? user.phone;
      user.province = req.body.province ?? user.province;
      user.district = req.body.district ?? user.district;
      user.save();
      res.status(200).json({
        success: true,
        user,
        message: "User updated successfully",
      });
    }
  })
);

export default router;
