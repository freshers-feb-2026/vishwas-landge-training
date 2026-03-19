import { Appointment, Availability, Doctor, Patient } from "../models/index.js";
import AppError from "../utils/AppError.js";

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

    console.log("availability.slots : ",availability.slots)
    const isSlotExist = availability.slots.find((slot)=>{
        return slot.start.slice(0,5)==start && slot.end.slice(0,5)==end
    })
    

    if(!isSlotExist){
        
        throw new AppError("Slot is Already Booked" , 400) 

    }
    
    const newAppointment = await Appointment.create({
        start, end, date, patientId: patient.id, doctorId});


    const updatedSlots = availability.slots.filter((slot) => {
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

    console.log("====== Week : " , weekday)


    const availability =await Availability.findOne({
        where: {
            doctorId,
            weekday
        }
    })

    if (!availability) {
        throw new AppError("Doctor is not available", 400)
    }

    const now = new Date();

    const isToday = parsedDate.toDateString() === now.toDateString();
    let slots=availability.slots;
    // console.log("Is Today : " + " "+ now.toDateString() +" " , isToday )

   if (isToday) {

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

    slots = slots.filter((slot) => {

        const [hours, minutes] = slot.start.split(":").map(Number);

        const slotMinutes = hours * 60 + minutes;

        return slotMinutes > currentMinutes+10;

    });

   }

    return res.status(200).json({
        message: "slots fetched Successfully",
        success: true,
        slots
    })

}