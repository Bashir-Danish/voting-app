import mongoose, { model } from 'mongoose'

const commentSchema = new mongoose.Schema({
    text :{
        type :String ,
    },
    postId:{
        type: mongoose.Schema.ObjectId,
        ref:"posts"
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref:"users"
    },
   
},{timestamps :true})

export default model('comments', commentSchema);