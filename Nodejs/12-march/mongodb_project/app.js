import express from "express"
import userRouter from "./routes/users.route.js"
import courseRouter from "./routes/course.route.js"
import adminRouter from "./routes/admin.route.js"

import session from "express-session";
import connectDB from "./lib/database.js";

import dotenv from "dotenv"
dotenv.config();


connectDB();

const app = express();


app.use(
    session({
        secret: "thesecret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            dbName: process.env.DB_DATABASE,
            collectionName: "sessions",
            ttl: 24 * 60 * 60
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);


app.use(express.json());

app.use((req, res, next) => {  //track req for debugging
    console.log(`${req.method} ===> ${req.url} `)
    next();
})


app.use("/users", userRouter) //uses start with /users checks like in js there is startsWith() method
app.use("/courses", courseRouter)
app.use("/admin", adminRouter)

app.use("/admin", () => { //if next() is called then only run this code otherwise not
    //If the middleware sends a response the next middleware will NOT run.
    console.log("Admin route hit")
})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})