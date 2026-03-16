
import { Course } from '../models/index.js';

export const addCourse =async(req , res)=>{
   
    try {
        const course = req.body;    
        const result = await Course.insertOne(course);
        return res.status(201).json({
            success: true,
            message: "Course created Successfully",
            course:result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const getAllCourse = async (req , res)=>{

    try {   
        
        const rows = await Course.find();

        return res.status(201).json({
            success: true,
            courses: rows
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


