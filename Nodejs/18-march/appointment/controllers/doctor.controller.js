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
    const existing = await Availability.findOne({ where: { weekday } });
    
    if (existing) {

        const result = await existing.update({
            start,
            end,
            isAvailable,
        })

        return res.status(201).json({
            message: "Avaibility Updated Successfully",
            success: true,
            avaibility: result.toJSON()
        })

    }


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


export const getAllAvaibility = async(req,res)=>{
  
    const {doctorId} = req.params;

    if (!doctorId || isNaN(doctorId) || Number(doctorId) <= 0) {
        throw new AppError("Invalid doctorId", 400);
    }

    const avaibilities = await Availability.findAll({where:{doctorId}})
     
    res.status(200).json({
        message:"Avaibility fetched Successfully",
        success:true,
        avaibility:avaibilities
    })



}

export const getDoctors = async (req, res) => {

    const doctors = await Doctor.findAll();
    res.status(200).json({
        message: "Doctors fetched successfully",
        success: true,
        doctors
    })

}