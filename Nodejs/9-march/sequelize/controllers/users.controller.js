import { validateUser } from "../utils/index.js";
import User from "../models/user.js";

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

        const result = await User.create(user);
        console.log(result)
        return res.status(201).json({
            success: true,
            message: "User created Successfully",
            user: result
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

        const user = await User.findByPk(id);
        console.log("user : ", user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(201).json({
            success: true,
            user: user
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


        const users = await User.findAll();

        return res.status(200).json({
            success: true,
            message: "Users Fetched Successfully",
            users: users
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

        // const [user] = await pool.query("select * from users where id = ?", [id])
        const user = await User.findByPk(id);

        const error = validateUser(newUser)

        if (error) {
            return res.status(400).json({
                success: false,
                message: error,
            })
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                user
            })
        }

        // const [result] = await pool.query("update users set name = ?, email = ? where id = ?", [newUser.name, newUser.email, id])
        const result = await User.update(newUser, {
            where: {
                id: id
            }
        })
        console.log("Update user : ", result)

        return res.status(201).json({
            success: true,
            message: "User updated Successfully",
            user: result?.affectedRows ? { ...newUser, id } : user[0]
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

        // const [result] = await pool.query("delete from users where id=?", [id])
        // const result = await User.destory({
        //     where: {
        //         id: id
        //     }
        // })

        const result = await User.destroy({
            where: {
                id: id
            },
        });

        console.log("The result delete   : ", result)
        if (!result) {
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



