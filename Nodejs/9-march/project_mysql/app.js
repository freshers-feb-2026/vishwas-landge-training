import express from "express"
import db from "./lib/database";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {

    const result = await db.execute("SELECT * FROM users")
    res.json({
        message: "Hello World"
    })
})

app.post("/users", async (req, res) => {

    const { name, email } = req.body;
    const result = await db.execute("INSERT INTO users (name, email) VALUES (?, ?)", [name, email])
    res.json({
        message: "User created successfully",
        userId: result[0].insertId
    })
}
);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})