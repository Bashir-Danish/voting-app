import express from "express";
import Category from "../models/categoryModel.js";
import { catchAsyncError } from "../middleware.js";

const router = express.Router();

router.get(
  "/all",
  catchAsyncError(async (req, res) => {
    const categories = await Category.find();

    return res.status(200).json({
      success: true,
      categories,
    });
  })
);

router.post(
  "/add",
  catchAsyncError(async (req, res) => {
    const category = await Category.create({
      categoryName: req.body.categoryName,
    });

    return res.status(201).json({
      success: true,
      category,
    });
  })
);

router.put(
  "/:id",
  catchAsyncError(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.categoryName = req.body.categoryName ?? category.categoryName;
    await category.save();
    res.status(200).json({
      success: true,
      category,
      message: "Category updated successfully",
    });
  })
);

router.delete(
  "/:id",
  catchAsyncError(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    await Category.deleteOne();
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  })
);

export default router;
