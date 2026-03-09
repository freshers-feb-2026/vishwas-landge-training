import { validateUser } from "../utils/index.js";
import pool from "../lib/database.js";

export const addUser = async (req, res) => {


    try {
        const user = req.body;

        const error = validateUser(user)

        // console.log(error)
        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            })
        }

        const [row] = await pool.query("INSERT INTO users (name, email) VALUES (?,?)", [user.name, user.email])

        return res.status(201).json({
            success: true,
            message: "User created Successfully",
            user: row.insertId
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



export const getUser = async (req, res) => {

    const { id } = req.params;

    try {

        const [rows] = await pool.query("select * from users where id = ?", [id])

        if (!rows.length) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(201).json({
            success: true,
            user: rows[0]
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}


export const getAllUsers = async (req, res) => {


    try {


        const [rows] = await pool.query("select * from users")

        return res.status(200).json({
            success: true,
            message: "Users Fetched Successfully",
            users: rows
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



export const updateUser = async (req, res) => {

    const { id } = req.params;
    const newUser = req.body;

    try {

        const [user] = await pool.query("select * from users where id = ?", [id])
        console.log(user)

        const error = validateUser(newUser)

        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            })
        }

        if (!user.length) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                user
            })
        }

        const [result] = await pool.query("update users set name = ?, email = ? where id = ?", [newUser.name, newUser.email, id])

        return res.status(201).json({
            success: true,
            message: "User updated Successfully",
            user: result.affectedRows ? { ...newUser, id } : user[0]
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



export const deleteUser = async (req, res) => {

    const { id } = req.params;

    try {

        const [result] = await pool.query("delete from users where id=?", [id])

        console.log("The resu")
        if (!result.affectedRows) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        return res.status(201).json({
            success: true,
            message: "User deleted Successfully",
            result
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



