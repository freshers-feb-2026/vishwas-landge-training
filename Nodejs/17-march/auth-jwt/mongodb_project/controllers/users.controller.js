import { validateCourses, validateUser } from "../utils/index.js";
import { User, Course, Admin } from "../models/index.js";
import AppError from "../utils/AppError.js";

export const addUser = async (req, res) => {

        const user = req.body;
        
        const error = validateUser(user)

        // console.log(error)
        if (error) {
             throw AppError(error , 400)
        }

        let { courses, ...newUser } = user;
        
        const existingUser=await User.findOne({email:newUser.email});

        if(existingUser){
              throw new AppError("User with this email already exists" , 400)
        }
        
        const invalidId = validateCourses(courses);

        if(invalidId){

              throw AppError(invalidId , 400)
        }
        
        let existingIds = await Course.find({ _id: { $in:courses } })
        
        console.log("Validated  ids of courses : : ", existingIds)
        
        if (existingIds.length !== courses.length) {
              throw new AppError("Invalid course ids" , 400)
        }
        
        newUser.courses = courses;
        newUser.admin=req?.user?.id;
        const result = await User.insertOne(newUser);

        // const createdUser = await User.findById(result._id).populate("courses");

        return res.status(201).json({
            success: true,
            message: "User created Successfully",
            user: result
        })

}



export const getUser = async (req, res) => {

    const { id } = req.params;

        const user = await User.findById(id).populate("courses");
        console.log("user : ", user)
        if (!user) {
              throw AppError("User not found" , 404)
        }

        return res.status(201).json({
            success: true,
            user: user
        })


}


export const getAllUsers = async (req, res) => {


        const users = await User.find().populate("courses");

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
}



export const updateUser = async (req, res) => {

    const { id } = req.params;
    const newUser = req.body;

        // const [user] = await pool.query("select * from users where id = ?", [id])
        const user = await User.findById(id);

        const error = validateUser(newUser)

        if (error) {
           throw new AppError(error , 400)
        }

        if (!user) {

        throw new AppError("User Not found" , 404)

        }

        // const [result] = await pool.query("update users set name = ?, email = ? where id = ?", [newUser.name, newUser.email, id])
        const result = await User.findByIdAndUpdate(id, newUser)
        console.log("Update user : ", result)

        return res.status(201).json({
            success: true,
            message: "User updated Successfully",
            user: result
        })

}



export const deleteUser = async (req, res) => {

    const { id } = req.params;

        // const [result] = await pool.query("delete from users where id=?", [id])
        // const result = await User.destory({
        //     where: {
        //         id: id
        //     }
        // })


        const user = await User.findById(id)

        if (!user) {
          throw new AppError("User Not found", 404)
        }

        if(user?.admin?.toString() !==req?.user?.id.toString()){
            const createdByAdmin = await Admin.findById(req?.user?.id)
            throw new AppError("User is Was not created by you its created By " + createdByAdmin?.name , 403)
        }

        await user.deleteOne();

        return res.status(200).json({
            success: true,
            message: "User deleted Successfully",
            user
        })

}

