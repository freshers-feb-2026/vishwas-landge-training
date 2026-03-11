import express from "express"
import userRouter from "./routes/users.route.js"
import sequelize from "./lib/database.js";

sequelize.sync({ alter: true })  //sync all models with database
    .then(() => {
        console.log("Database synced successfully")
    })
    .catch((err) => {
        console.error("Error syncing database:", err);
    });

const app = express();



app.use(express.json());

app.use((req, res, next) => {  //track req for debugging

    console.log(`${req.method} ===> ${req.url} `)
    next();
})


app.use("/users", userRouter)



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})