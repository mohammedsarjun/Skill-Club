import express from 'express'

const authRouter = express.Router()

authRouter.post("/signup",(req,res)=>{
    console.log(req.body)
})


export default authRouter