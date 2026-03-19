import { Appointment, Availability, Doctor, Patient } from "../models/index.js";
import AppError from "../utils/AppError.js";
import { removeExpiredSlots } from "../utils/index.js";

export const createAppointment = async (req, res) => {

    const { doctorId } = req.params;

    const {
        start,
        end,
        date } = req.body;

    const parsedDate = new Date(date);
    const weekday = parsedDate.getDay()
    const patient = await Patient.findOne({ where: { userId: req.user.id } })

    const availability = await Availability.findOne({
        where: { doctorId , weekday }
    });
    let slots=availability.slots;
    slots = removeExpiredSlots(parsedDate, slots);
    
    const isSlotExist = slots.find((slot)=>{
        return slot.start==start && slot.end==end
    })
    

    if(!isSlotExist){
        
        throw new AppError("Slot is Already Booked or invalid, please select another slot" , 400) 

    }
    
    const newAppointment = await Appointment.create({
        start, end, date, patientId: patient.id, doctorId});


    const updatedSlots = slots.filter((slot) => {
        return !(slot.start === start && slot.end === end);
    });

    await availability.update({
        slots: updatedSlots
    });    

     
       return res.status(200).json({
            message:"Appointment Created Successfully",
            success:true,
            appointment:newAppointment
        })


}

export const getSlots = async (req, res) => {


    const { doctorId, date } = req.params;
    const parsedDate = new Date(date);
    const weekday = parsedDate.getDay()

    const availability =await Availability.findOne({
        where: {
            doctorId,
            weekday
        }
    })

    if (!availability) {
        throw new AppError("Doctor is not available", 400)
    }

    let slots=availability.slots;

    slots = removeExpiredSlots(parsedDate, slots);

    return res.status(200).json({
        message: "slots fetched Successfully",
        success: true,
        slots
    })

}