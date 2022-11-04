import mongoose, { model } from 'mongoose'

const categorySchema = new mongoose.Schema({
    categoryName :{
        type: String,
    },
})

export default model('categories', categorySchema);