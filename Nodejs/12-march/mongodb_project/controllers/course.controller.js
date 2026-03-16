
import { Course } from '../models/index.js';

export const addCourse =async(req , res)=>{
   
        const course = req.body;    
        const result = await Course.insertOne(course);
        return res.status(201).json({
            success: true,
            message: "Course created Successfully",
            course:result
        })

}

export const getAllCourse = async (req , res)=>{

        
        const rows = await Course.find();

        return res.status(201).json({
            success: true,
            courses: rows
        })

}


