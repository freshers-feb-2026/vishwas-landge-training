import Joi from "joi";

export const createAvailabilitySchema = Joi.object({

    weekday: Joi.number()
        .integer()
        .min(0)
        .max(6)
        .required()
        .messages({
            "number.base": "Weekday must be a number",
            "number.min": "Weekday must be between 0 and 6",
            "number.max": "Weekday must be between 0 and 6"
        }),

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

    isAvailable: Joi.boolean()
        .optional()

}).custom((value, helpers) => {

    if (value.end <= value.start) {
        return helpers.message("End time must be after start time");
    }

    return value;

})