import mongoose, { model } from 'mongoose'

const postSchema = new mongoose.Schema({
    text :{
        type :String ,
    },
    file:{
        type:String,
    },
    office:{
        type: mongoose.Schema.ObjectId,
        ref:"offices"
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref:"categories"
    },
    isApprove:{
        type:Boolean,
        default:false
    },
 
},{timestamps :true})

export default model('posts', postSchema)