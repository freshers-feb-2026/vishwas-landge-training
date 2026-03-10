import { validateUser } from "../utils/index.js";
import { User, Course } from "../models/index.js";

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

        let { courses, ...newUser } = user;
        
        const existingUser=await User.findOne({
            where:{
                email:newUser.email
            }
        });

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User with this email already exists"
            })
        }

        console.log("Befor======== ")
        const result = await User.create(newUser);
        console.log("After =====")

        let validIds = await Course.findAll({
            where: {
                id: courses
            }
        })

        console.log("Validated  ids of courses : : ", validIds)

        if (validIds.length !== courses.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ids"
            })
        }

        await result.addCourses(courses);

        const createdUser = await User.findByPk(result.id, {
            include: Course
        })

        return res.status(201).json({
            success: true,
            message: "User created Successfully",
            user: createdUser
        })

    } catch (error) {
        console.error("Thata ths error  : ", error)
        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



export const getUser = async (req, res) => {

    const { id } = req.params;

    try {

        const user = await User.findByPk(id, { include: Course });
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


        const users = await User.findAll({ include: Course });

        //   attributes: ["id", "name", "email"],
        //   include: {
        //     model: Course,
        //     attributes: ["id", "name"],
        //     through: { attributes: [] }
        //   }

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



