import { promisify } from "util";
import Admin from "../models/admin.js";
import { validateAdminData } from "../utils/index.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const createAdmin = async (req, res) => {

    try {

        const { name, email, password } = req.body;
        const error = validateAdminData({ name, email, password });

        if (error) {
            return res.status(400).json({
                message: error,
                success: false

            })
        }

        const exstingAdmin = await Admin.findOne({
            where: {
                email
            }
        })

        if (exstingAdmin) {
            return res.status(404).json({
                message: "Admin alredy exist.",
                success: false,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const CreatedAdmin = await Admin.create({ name, email, password: hashedPassword })
        const { password: removePassword, ...admin } = CreatedAdmin.toJSON();

        console.log("Admin  : ==== ", admin)

        return res.status(201).json({
            success: true,
            data: admin
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message

        })

    }
}

export const loginAdmin = async (req, res) => {

    try {

        const { password, email } = req.body;

        const error = validateAdminData({ name:"default", email, password });
         
        if (error) {
            return res.status(400).json({
                message: error,
                success: false

            })
        }

        const admin = await Admin.findOne({
            where: {
                email
            }
        })

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found.",
                success: false,
            })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password.",
                success: false,
            });
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


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        })
    }

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
    try {
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

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging out."
        })
    }


}

export const SendResetPasswordMail = async (req, res) => {

    try {

        const { email } = req.body;
        
        const error = validateAdminData({ name:"default", email, password:"default" });
         
        if (error) {
            return res.status(400).json({
                message: error,
            success: false          })  
        }
         
        const admin = await Admin.findOne({
            where: {
                email
            }
        })   
        
        if (!admin) {       
         
           return res.status(404).json({
                success: false,
                message: "Admin not found."
            })
         }
          
         const randomBytesAsync  = promisify(crypto.randomBytes);
         const buffer = await randomBytesAsync(20);
         
         const token = buffer.toString("hex");
         const expiry = Date.now() + 60 * 60 * 1000;

        
        // const result = await Admin.update(
        //     {
        //         resetPasswordToken: token,
        //         resetPasswordExpires: expiry
        //     },
        //     {
        //         where: {
        //             id: admin.id
        //         }
        //     }
        // )

        admin.resetPasswordToken = token;
        admin.resetPasswordExpires = expiry;

        await admin.save();

        return res.status(200).json({
            success: true,
            message: "Password reset token generated.",
            link: `http://localhost:3000/admin/reset-password/${token}`,
            data: {
                token,
                expiry
            }
        })


    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


export const resetPassword = async (req, res) => {

    try {

        const { token } = req.params;
        const { newPassword } = req.body;

        const admin = await Admin.findOne({where:{ resetPasswordToken: token }})

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid token."
            })
        }

        // console.log("Token:"+ token+";" , admin )
        // console.log("Expiry " , admin.resetPasswordExpires)

        if (admin.resetPasswordExpires < Date.now()) {

            return res.status(400).json({
                success: false,
                message: "Token has expired."
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        admin.password = hashedPassword;
        admin.resetPasswordToken = null;
        admin.resetPasswordExpires = null;
          
        await admin.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successful."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}