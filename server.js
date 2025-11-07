import express from "express"
import prodRoute from "./routes/route.js"
import mongoose from "mongoose"
const app = express()
const port = 3000

app.use(express.json());

let middleware=(req,res,next)=>{
    console.log("Middleware Running")
    next()
}
const db_url="mongodb+srv://Talha:mongodb123@cluster0.6slhxve.mongodb.net/SMIT"
mongoose.connect(db_url).then(()=>{
 console.log("MongoDB connected.")
}
   
).catch((error)=>{
    console.log("MongoDB connection Error!")
    console.error(error)
})
app.use("/product",prodRoute)
app.get('/', middleware,(req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
