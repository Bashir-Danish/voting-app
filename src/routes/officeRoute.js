import express from "express";
import { catchAsyncError } from "../middleware.js";
import Office from "../models/officeModel.js";
const router = express.Router();

router.post(
    "/add",
    catchAsyncError(async (req, res) => {
        const { name, province } = req.body;
        let office = await Office.create({
            name,
            province,
        });
        res.status(201).json({
            success: true,
            office,
        });
    })
);

router.get(
    "/all",
    catchAsyncError(async (req, res) => {

        let offices = await Office.find().populate('province');
        res.status(200).json({
            success: true,
            offices,
        });
    })
);
router.put(
    "/:id",
    catchAsyncError(async (req, res) => {

        let office = await Office.findById(req.params.id);
        office.name = req.body.name ?? office.name;
        office.province = req.body.province ?? office.province;

        office.save()
        res.status(200).json({
            success: true,
            office,
        });
    })
);

router.delete(
    "/:id",
    catchAsyncError(async (req, res) => {

        let office = await Office.findById(req.params.id);
        if (!office) {
            return res.status(404).json({message :'office not found'})
        } else {
            await office.deleteOne()
            
            res.status(200).json({
                success: true,
                message :'office successfully deleted'
            });
        }
        
    })
);

export default router