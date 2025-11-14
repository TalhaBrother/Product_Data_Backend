import express from "express"
import prodRoute from "./routes/route.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
const app = express()
const port = 3000

dotenv.config()
app.use(express.json());

let middleware=(req,res,next)=>{
    console.log("Middleware Running")
    next()
}
const db_url=process.env.db_url
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
