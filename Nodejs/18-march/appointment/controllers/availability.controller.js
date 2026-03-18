import { Availability, Doctor } from "../models/index.js";
import AppError from "../utils/AppError.js";
import { generateSlots } from "../utils/index.js";

export const createAvaibility = async (req, res) => {

    const { weekday, start, end, isAvailable } = req.body

    const userId = req.user.id;

    const doctor = await Doctor.findOne({where:{userId}})

    if(!doctor){
        throw new AppError("Doctor not found" , 404)
    }

    const slots = generateSlots(start, end);

    const newAvaibility = await Availability.create({
        weekday,
        start,
        end,
        isAvailable,
        slots,
        doctorId:doctor.id

    })

    res.status(201).json({
        message:"Avaibility Created Successfully",
        success:true,
        avaibility:newAvaibility.toJSON()
    })

}