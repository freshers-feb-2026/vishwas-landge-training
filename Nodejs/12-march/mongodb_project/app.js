import express from "express"
import userRouter from "./routes/users.route.js"
import courseRouter from "./routes/course.route.js"
import adminRouter from "./routes/admin.route.js"
import MongoStore from "connect-mongo";
import session from "express-session";
import connectDB from "./lib/database.js";
import orderRouter from "./routes/order.route.js"
import dotenv from "dotenv"
import { errorHandler } from "./middlewares/errorHandler.js";
dotenv.config();


await connectDB();

const app = express();

// console.log("This are env : " , process.env)

const store = MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            dbName: process.env.DB_DATABASE,
            // client: mongoose.connection.getClient(),
            collectionName: "sessions",
            ttl: 24 * 60 * 60
        })

app.use(
    session({
        secret: "thesecret",
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

store.on("connect", () => {
  console.log("MongoStore connected for sessions");
});

app.use(express.json());

app.use((req, res, next) => {  //track req for debugging
     
    console.log("\n-------------------------\n")

    console.log(`\n${req.method} ===> ${req.url}  ===> ${JSON.stringify(req.body , null, 2)} \n`)
   
    console.log("\n-------------------------")
   
    next();
})


app.use("/users", userRouter) //uses start with /users checks like in js there is startsWith() method
app.use("/courses", courseRouter)
app.use("/admin", adminRouter)
app.use("/orders", orderRouter)

app.use("/admin", () => { //if next() is called then only run this code otherwise not
    //If the middleware sends a response the next middleware will NOT run.
    console.log("Admin route hit")
})

app.use(errorHandler)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})