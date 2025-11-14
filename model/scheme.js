import mongoose from "mongoose"

const schema=new mongoose.Schema({
    name:{type: String,required: true},
    price:{type:Number, required:true},
    desc:{type: String,required: true},
    category:[{type: String,required: true}],
    rating:{type: Number},
    inStock:{type: Boolean, required:true}
},{
    timestamps:true
})
const userModel = mongoose.model('smit', schema,'smit');

export default userModel;