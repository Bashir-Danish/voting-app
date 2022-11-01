import mongoose, { model } from "mongoose";

const districtSchema = new mongoose.Schema({
    name:{
        type:String
    }
    ,
    province:{
        type: mongoose.Schema.ObjectId,
        ref: "provinces", 
    }
})
export default model('districts' , districtSchema);
