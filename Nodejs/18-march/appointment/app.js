import dotenv from "dotenv"
dotenv.config();
import express from "express"
import { DB_DATABASE, PORT } from "./configs/config.js";
import userRouter from "./routes/user.route.js"
import sequelize from "./lib/database.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import {User} from "./models/index.js"
import adminRouter from "./routes/doctor.route.js"
import appointmentRouter from "./routes/appointments.route.js"
await sequelize.authenticate().then(()=>{
    console.log("DB Connected Successfully :  == > " , DB_DATABASE)
})

await sequelize.sync({alter:true}).then(()=>{
  console.log("Database Synced")
}).catch((err)=>{
    console.log("Failded To Sync DB : " , err)
})


const app=express();



app.use(express.json())

app.use((req,res,next)=>{
    console.log("\n=================================")
    console.log("\n" +req.method + " == > "+ req.url + " ==> " + req.body + "")
    console.log("\n=================================")

    next()

})


app.use("/users" ,userRouter);
app.use("/doctors" ,adminRouter);
app.use("/appointments" , appointmentRouter)


app.get("/", (req,res)=>{

    res.send("Hello")

})

app.use(errorMiddleware);



app.listen(PORT , ()=>{

    console.log("\nServer Started On : ====> "+ PORT)

})



