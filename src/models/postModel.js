import mongoose, { model } from 'mongoose'

const postSchema = new mongoose.Schema({
    title :{
        type :String ,
    },
    text :{
        type :String ,
    },
    file: {
        type: []
    },
    office:{
        type: mongoose.Schema.ObjectId,
        ref:"offices"
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref:"categories"
    },
    province:{
        type: mongoose.Schema.ObjectId,
        ref:"provinces"
    },
    district:{
        type: mongoose.Schema.ObjectId,
        ref:"districts"
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "users",
        default: null,
    },
    isApprove:{
        type:Boolean,
        default:false
    },
 
},{timestamps :true})

export default model('posts', postSchema)