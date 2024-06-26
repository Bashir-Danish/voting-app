import express from "express";
import { catchAsyncError } from "../middleware.js";
import User from "../models/usersModel.js";
import { fileURLToPath } from "url";
import path from "path";

const router = express.Router();

router.post(
  "/signup",
  catchAsyncError(async (req, res) => {
    let user = await User.create(req.body);
    res.status(201).json({
      success: true,
      users: [user],
    });
  })
);

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
  "/:uid",
  catchAsyncError(async (req, res) => {
    const user = await User.find({ uid: req.params.uid });
    
    let code = 200;
    let message = true;
    if (!user) {
      code = 404;
      message = false;
    }
    res.status(code).json({
      success: message,
      users: user
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
      await user.deleteOne();

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
