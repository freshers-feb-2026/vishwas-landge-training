
import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {

        console.log(error)

        return res.status(400).json({

            message: error.array()[0].msg,
            success: false,
            error

        })

    }

    next()

}