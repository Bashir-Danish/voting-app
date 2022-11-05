import express from "express";
import { catchAsyncError } from "../middleware.js";
import District from "../models/districtModel.js";
const router = express.Router();

router.post(
    "/add",
    catchAsyncError(async (req, res) => {
        const { name, province } = req.body;

        let district = await District.create({
            name,
            province,
        });
        res.status(201).json({
            success: true,
            district,
        });
    })
);

router.get(
    "/all",
    catchAsyncError(async (req, res) => {
        let districts = await District.find().populate('province');
        res.status(200).json({
            success: true,
            districts,
        });
    })
);

router.delete(
    "/:id",
    catchAsyncError(async (req, res) => {
        const district = await District.findById(req.params.id);
        if (!district) {
            res.status(500).json({
                message: "district not found",
            });
        } else {
            await district.deleteOne();

            res.status(200).json({
                success: true,
                message: "District deleted successfully",
            });
        }
    })
);

router.put(
    "/:id",
    catchAsyncError(async (req, res) => {
        const district = await District.findById(req.params.id);
        if (!district) {
            res.status(500).json({
                message: "district not found",
            });
        } else {
            const { name, province } = req.body;
            district.name = name ?? district.name;
            district.province = province ?? district.province;
            district.save();
            res.status(200).json({
                success: true,
                district,
                message: "District updated successfully",
            });
        }
    })
);

export default router;
