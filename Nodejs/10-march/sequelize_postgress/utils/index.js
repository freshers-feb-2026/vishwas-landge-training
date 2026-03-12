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