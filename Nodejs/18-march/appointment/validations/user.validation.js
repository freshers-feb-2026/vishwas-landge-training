import Joi from "joi";

export const createUserSchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required(),

    // phone: Joi.string()
    //     .pattern(/^[0-9]{10}$/)
    //     .required()
    //     .messages({
    //         "string.pattern.base": "Phone must be 10 digits"
    //     }),

    role: Joi.string()
        .valid("doctor", "patient")
        .required(),

    specialization: Joi.string().when("role", {
        is: "doctor",
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }),

    age: Joi.number().integer().min(0).when("role", {
        is: "patient",
        then: Joi.required(),
        otherwise: Joi.forbidden()
    }),

    symtoms: Joi.string().when("role", {
        is: "patient",
        then: Joi.required(),
        otherwise: Joi.forbidden()
    })

});


export const userLoginSchema = Joi.object({

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Email must be valid",
            "any.required": "Email is required"
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters",
            "any.required": "Password is required"
        })

});