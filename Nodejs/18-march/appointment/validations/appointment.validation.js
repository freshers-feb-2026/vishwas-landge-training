import Joi from "joi";

export const createAppointmentSchema = Joi.object({

    start: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
            "string.pattern.base": "Start time must be in HH:mm format"
        }),

    end: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
            "string.pattern.base": "End time must be in HH:mm format"
        }),

    date: Joi.date()
        .required()
        .messages({
            "date.base": "Date must be valid"
        })

}).custom((value, helpers) => {

    if (value.end <= value.start) {
        return helpers.message("End time must be after start time");
    }

    return value;

});