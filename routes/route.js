import express from "express"
import userModel from "../model/scheme.js"

const prodRoute=express.Router()

prodRoute.get("/",async(req,res)=>{
    try {
          let products= await userModel.find()
    res.json({
        message:"successful",
        products:products,
        code:200,
    })
    } catch (error) {
        console.error(error.message)
    }
  
})
prodRoute.post("/",async(req,res)=>{
    try {
            const{name,price}=req.body
            if(!name || !price){
                return res.json("Invalid data for creating user")
            }
    const newProduct=new userModel(req.body)
    if(newProduct){
    await newProduct.save()
    res.json({
          message:"successful",
          AddedProduct:newProduct,
        code:200,
    })
    }
    else{
        res.json({
                 message:"unsuccessful",
                 code:200,
        })
    }
}
    catch (error) {
        console.error(error.message)
    }
})
prodRoute.get("/:id",async(req,res)=>{
    try {
         const {id}=req.params
    let oneProduct=await userModel.findById(id)
    if(oneProduct){
       return res.json({
            message:"successful",
            product:oneProduct,
        })
    }
    else{
     return res.json("No user exists with the given id")
    }

    } catch (error) {
        console.error(error.message)
        res.json("Error!")
    }
   
})
prodRoute.delete("/:id",async(req,res)=>{
    try {
           const {id}=req.params
           let deleteUser=userModel.findById(id)
           if(deleteUser){
               await userModel.deleteOne({ _id:id });
    res.json({
        message:"successfully deleted!",
        code:200
    })
           }
         
 
    } catch (error) {
        console.error(error)
        res.json("User doesn't exists.")
    }
 
})

export default prodRoute