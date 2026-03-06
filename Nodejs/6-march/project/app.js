import express from "express"
import userRouter from "./routes/users.route.js"
const app=express();


app.use(express.json());


app.use((req, res , next)=>{  //track req for debugging

    console.log(`${req.method} ===> ${req.url} `)
    next();
})


app.use("/users" , userRouter)

// app.use((req, res, next)=>{
// res.status(404).json({
 
// })
// })


app.listen(3000,()=>{
 console.log("Listning the sever..")

})
