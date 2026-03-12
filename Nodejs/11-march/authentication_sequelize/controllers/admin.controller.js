import Admin from "../models/admin.js";
import { validateAdminData } from "../utils/index.js";
import bcrypt from "bcrypt";

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