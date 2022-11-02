import mongoose, { model } from "mongoose"


const officeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    province: {
        type: mongoose.Schema.ObjectId,
        ref: "provinces"
    }
});

export default model('offices', officeSchema);