import mongoose, { model } from "mongoose";


const userSchema = new mongoose.Schema({
    name :{
        type: String,
        required : true
    },
    lastName :{
        type: String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    phone:{
        type:Number,
        required : true
    },
    province :{
        type: mongoose.Schema.ObjectId,
        required : true,
        ref: "provinces",
    },
    district :{
        type: mongoose.Schema.ObjectId,
        required : true,
        ref: "districts",
    },

});

export default model('users',userSchema);