import Joi from "joi"

export const validateUser =(user)=>{
    const schema = Joi.object({
        name:Joi.string().min(3)
        .max(30)
        .required(),
       age:Joi.number().optional(),
       email:Joi.string().email().required(),
       courses:Joi.array().length(2).optional()
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