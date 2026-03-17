import Joi from "joi"
import mongoose from "mongoose";

export const validateUser =(user)=>{
    const schema = Joi.object({
        name:Joi.string().min(3)
        .max(30)
        .required(),
       age:Joi.number().optional(),
       email:Joi.string().email().required(),
       courses:Joi.array().optional(),
       profile:Joi.object({
        bio:Joi.string().max(500).optional(),
        address:Joi.string().max(200).optional()
       }).optional()
    });

    const result = schema.validate(user);
    // console.log(result)
    return result.error?.details[0]?.message;
}

export const validateAdminData = ({name, email, password}) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }); 
   
    const { error } = schema.validate({ name, email, password });
    return error ? error?.details[0]?.message : null;
}

export const validateCourses = (courses) => {
   for(let courseId of courses){
       
     if(!mongoose.Types.ObjectId.isValid(courseId)){
        return `Invalid course id : ${courseId}`;
     }
   } 
   return null;
 
}

export const validateOrderData = (data) => {
    if (!mongoose.Types.ObjectId.isValid(data.userId)) {
        return `Invalid user id : ${data.userId}`;
    }

    if (typeof data.product !== "string" || data.product.trim() === "") {
        return "Product name must be a non-empty string.";
    }

}