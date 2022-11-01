import mongoose, { model } from 'mongoose'

const provinceSchema = new mongoose.Schema({
    name:{
        type:String,
        unique : true,
    }
})
export default model('provinces' , provinceSchema)