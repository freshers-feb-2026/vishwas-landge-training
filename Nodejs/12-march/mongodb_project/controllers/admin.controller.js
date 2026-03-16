import {Admin} from "../models/index.js";
import AppError from "../utils/AppError.js";

import { validateAdminData } from "../utils/index.js";
import bcrypt from "bcrypt";

export const createAdmin = async (req, res) => {


        const { name, email, password } = req.body;
        const error = validateAdminData({ name, email, password });

        if (error) {

            throw AppError(error , 400)
        }

        const exstingAdmin = await Admin.findOne({email})

        if (exstingAdmin) {

             throw AppError("Admin alredy exist." , 422)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const CreatedAdmin = await Admin.insertOne({ name, email, password: hashedPassword })
        const { password: removePassword, ...admin } = CreatedAdmin.toJSON();

        console.log("Admin  : ==== ", admin)

        return res.status(201).json({
            success: true,
            data: admin
        })

}

export const loginAdmin = async (req, res) => {


        const { password, email } = req.body;

        const error = validateAdminData({ name:"default", email, password });
         
        if (error) {
        
            throw AppError(error , 400)

        }

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found.",
                success: false,
            })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            throw AppError("Invalid password." , 401)
        }

        req.session.adminId = admin.id;
        req.session.role = "admin"

        res.status(200).json({
            success: true,
            message: "Login successful.",
            data: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
            },
        });


}


//callbabck based
// export const logoutAdmin = (req, res) => {

//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Error logging out."
//             })
//         }
//        return res.status(200).json({
//             success: true,
//             message: "Logout successful."
//         })  

//     })


// }

// callback based with promise

export const logoutAdmin = async (req, res) => {
        await new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) return reject(err);
                resolve();
            })
        })

        res.clearCookie("connect.sid");
        return res.status(200).json({
            success: true,
            message: "Logout successful."
        })

}