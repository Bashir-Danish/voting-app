import mongoose, { model } from 'mongoose'

const postSchema = new mongoose.Schema({
    text :{
        type :String ,
    },
    file:{
        type:String,
    },
    isApprove:{
        type:Boolean,
        default:false
    }
},{timestamps :true})

export default model('posts', postSchema)