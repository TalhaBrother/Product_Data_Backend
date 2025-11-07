import mongoose from "mongoose"

const schema=new mongoose.Schema({
    name:String,
    price:Number,
})
const userModel = mongoose.model('smit', schema,'smit');

export default userModel;