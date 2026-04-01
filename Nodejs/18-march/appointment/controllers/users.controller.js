import { JWT_SECRET } from "../configs/config.js";
import { ROLE } from "../constants/index.js";
import {User , Doctor, Patient } from "../models/index.js"

import AppError from "../utils/AppError.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export const createUser = async (req, res) => {

    const { name, email, password, role, ...profile } = req.body;

    const existingUser = await User.scope(null).findOne({ where: { email } })

    if (existingUser) {

        throw new AppError("User Already exist", 400)

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ email, password: hashedPassword, role, name })
    const userData = newUser.toJSON();
    delete userData.password;

    if (ROLE.DOCTOR == role) {

        const doctor = await Doctor.create({ ...profile, userId: newUser.id })
        return res.status(201).json({
            message: "User Doctor created successfully",
            success: true,
            user: {
                ...newUser,
                doctor
            }
        })

    } else {

        const patient = await Patient.create({ ...profile, userId: newUser.id })
        return res.status(201).json({
            message: "User Patient created successfully",
            success: true,
            user: {
                ...userData,
                patient
            }
        })

    }

}


export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.scope(null).findOne({
        where: {
            email
        }
    })

    if (!user) {
        throw new AppError("User Does not Exist", 404);
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {

        throw new AppError("Incorrect Password", 401)

    }

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(payload, JWT_SECRET ,{ expiresIn: "1h" })


    return res.status(200).json({

        message: "User logged successfully",
        success: true,
        token,
        user: payload

    })

}

export const getAllUsers = async (req, res) => {

    const users = await User.findAll({ raw: true });

    const usersWithTokens = users.map((user) => {

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1h"
        })


        return { ...user, token };

    })

    return res.json({
        message: "Users fetched successfully (DEV)",
        success: true,
        users: usersWithTokens
    })



}