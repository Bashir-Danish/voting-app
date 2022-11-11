import mongoose, { model } from 'mongoose'

const commentSchema = new mongoose.Schema({
    text :{
        type :String,
        required :true,
    },
    post:{
        type: mongoose.Schema.ObjectId,
        ref:"posts"
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"users"
    },
   
},{timestamps :true})

export default model('comments', commentSchema);