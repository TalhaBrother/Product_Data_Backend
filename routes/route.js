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
        res.send({
             message:"unsuccessful",
            code:400,
        })
    }
  
})
prodRoute.post("/",async(req,res)=>{
    try {
            const{name,price,desc,category,rating,inStock}=req.body
            if(!name || !price || !desc || !category || !rating ||!inStock){
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
    // else{
    //     res.json({
    //              message:"unsuccessful",
    //              code:400,
    //     })
    // }
}
    catch (error) {
        console.error(error.message)
          res.json({
                 message:"unsuccessful",
                 code:400,
        })
    }
}
)
// prodRoute.get("/:id",async(req,res)=>{
//     try {
//          const {id}=req.params
//     let oneProduct=await userModel.findById(id)
//     if(oneProduct){
//        return res.json({
//             message:"successful",
//             product:oneProduct,
//         })
//     }
//     else{
//      return res.json("No user exists with the given id")
//     }

//     } catch (error) {
//         console.error(error.message)
//         res.json("Error!")
//     }
   
// })
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
        res.json({
        message:"User doesn't exists!",
        code:400
    })
    }
 
})
prodRoute.get("/filter",async(req,res)=>{
    try {
        let queries=req.query
        console.log(queries)
       
        let smit=await userModel.find(
            // {name:{$regex:req.query.name,$options:"i"}}
            // {inStock:req.query.inStock}
            {price:req.query.price}
        )
        res.send(smit)
    } catch (error) {
        console.error(error.message)
    }
})

export default prodRoute