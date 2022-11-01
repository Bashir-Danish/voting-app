import express from "express";
import { catchAsyncError } from "../middleware.js";
import Poll from "../models/pollModel.js";
import User from "../models/usersModel.js";
const router = express.Router();

router.get(
    "/all",
    catchAsyncError(async (req, res) => {
        let polls = await Poll.find();
        res.status(200).json({
            success: true,
            polls,
        });
    })
);

router.post(
    "/add",
    catchAsyncError(async (req, res) => {
        let { title, description, options } = req.body;

        options = options.map((obj) => {
            return {
                name: obj,
                vote: null,
            };
        });
        let poll = await Poll.create({
            title,
            description,
            options,
        });
        res.status(201).json({
            success: true,
            poll,
        });
    })
);

router.get(
    "/:id",
    catchAsyncError(async (req, res) => {
        let poll = await Poll.findById(req.params.id);
        let options = [...poll.options];

        let result = [];
        options.forEach((option) => {
            let percentage = (option.vote * 100) / poll.totalVote;

            result.push({
                ...option._doc,
                percentage: percentage ? percentage : 0,
            });
        });

        res.status(200).json({
            success: true,
            result,
        });
    })
);


router.post(
    "/:id",
    catchAsyncError(async (req, res) => {
        try {
            let poll = await Poll.findById(req.params.id);
            let options = [...poll.options]
            let index = req.body.opIndex
          
            
            if (options.indexOf(options[index]) !== -1) {
                options[index].vote = options[index].vote + 1;
                let totalVote = poll.totalVote + 1;
                await Poll.findByIdAndUpdate(
                    { _id: poll._id },
                    {
                        $set: {
                            options,
                            totalVote
                        }
                    }
                );

                let user = await User.findById(req.body.userId);

                user.polls.push({
                    pollId: req.params.id,
                    opIndex : req.body.opIndex
                })
                user.save();

                return res.status(200).json({
                    success: true,
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message:"option not found"
                });
            }


            
        } catch (error) {
            console.log(error)
        }
    })
);


router.delete('/:id', catchAsyncError(async (req, res) => {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
        res.status(500).json({
            message:"Poll not found"
        })
    } else {
        await poll.remove();
    
        res.status(200).json({
          success: true,
          message: "Poll deleted successfully",
        });
      }
}
));
export default router;
