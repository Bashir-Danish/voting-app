import express from 'express';
import { catchAsyncError } from '../middleware.js';
import Province from '../models/provinceModel.js'
const router = express.Router();

router.post('/add', catchAsyncError(async (req, res) => {
    const { name } = req.body;

    let province = await Province.create({
        name
    });
    res.status(201).json({
        success: true,
        province,
    });
}
))

router.get('/all', catchAsyncError(async (req, res) => {
    let provinces = await Province.find();
    res.status(200).json({
        success: true,
        provinces,
    });
}
));

router.delete('/:id', catchAsyncError(async (req, res) => {
    const province = await Province.findById(req.params.id);
    if (!province) {
        res.status(500).json({
            message: "province not found"
        })
    } else {
        await province.deleteOne();

        res.status(200).json({
            success: true,
            message: "Province deleted successfully",
        });
    }
}
));

router.put('/:id', catchAsyncError(async (req, res) => {
    const province = await Province.findById(req.params.id);
    if (!province) {
        res.status(500).json({
            message: "province not found"
        })
    } else {
        const { name } = req.body;
        province.name = name;
        province.save();
        res.status(200).json({
            success: true,
            province,
            message: "Province updated successfully",
        });
    }
}
));


export default router;