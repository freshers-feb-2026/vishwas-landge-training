import { ROLE } from "../constants/index.js";
import { Appointment, Availability, Doctor, Patient } from "../models/index.js";
import AppError from "../utils/AppError.js";
import { checkCanCancelAppointment, removeExpiredSlots } from "../utils/index.js";

export const createAppointment = async (req, res) => {

    const { doctorId } = req.params;

    if (!doctorId || isNaN(doctorId) || Number(doctorId) <= 0) {
        throw new AppError("Invalid doctorId", 400);
    }

    const {
        start,
        end,
        date } = req.body;

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        throw new AppError("Invalid date format", 400);
    }

    const weekday = parsedDate.getDay()
    const patient = await Patient.findOne({ where: { userId: req.user.id } })

    const availability = await Availability.findOne({
        where: { doctorId , weekday }
    });
    
    if(!availability){
        throw new AppError("Doctor is not Available" , 400)
    }

    let slots=availability.slots;
    slots = removeExpiredSlots(parsedDate, slots);
    
    const isSlotExist = slots.find((slot)=>{
        return slot.start==start && slot.end==end
    })
    

    if(!isSlotExist){
        console.log(" ")
        throw new AppError("Slot is Already Booked or invalid, please select another slot" , 400) 

    }
    
    const newAppointment = await Appointment.create({
        start, end, date, patientId: patient.id, doctorId , weekday});


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


export const cancelAppointment = async(req,res)=>{

    const {appointmentId} =req.params;
    
    if (!appointmentId || isNaN(appointmentId) || Number(appointmentId) <= 0) {
        throw new AppError("Invalid doctorId", 400);
    }
    const appointment  = await Appointment.findByPk(appointmentId);
    if(!appointment){
        throw new AppError("Invalid Appointment Id")
    }
    console.log(appointment)
    let {date , start , end }= appointment;

    start=start.slice(0,5)
    end=end.slice(0,5)

    const patient = await Patient.findByPk(appointment.patientId);

    if(req.user.id != patient.userId){
       
        throw new AppError("Appointment does not belong to you" , 403)

    }

    if(checkCanCancelAppointment(date , start , end)==true){
        
        throw new AppError("Can only cancel Appointment before timing of appointment 2 hours before" , 400)
        
    }

   const updated =  await appointment.update({isCanceled : true})
  
   const avaibility =  await Availability.findOne({where :{doctorId:appointment.doctorId, weekday:appointment.weekday}})
    
    const newSlots = [{start , end} , ...avaibility.slots];
    await avaibility.update({slots:newSlots})

    return res.status(200).json({
        message: "Appointment Canceled Successfully",
        success: true,
        appointment:updated
    })

}

export const getSlots = async (req, res) => {


    const { doctorId, date } = req.params;
    
    if (!doctorId || isNaN(doctorId) || Number(doctorId) <= 0) {
        throw new AppError("Invalid doctorId", 400);
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        throw new AppError("Invalid date format", 400);
    }
    const weekday = parsedDate.getDay()

    const availability = await Availability.findOne({
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

export const getAllAppointments = async(req, res)=>{

    const userId = req.user.id;
    let appointments;
    if (req.user.role == ROLE.DOCTOR) {
       
        const doctor = await Doctor.findOne({where : {userId}});
        appointments = await Appointment.findAll({ where: { doctorId: doctor.id } });

    }else{
         
        const patient = await Patient.findOne({where : {userId}});
        appointments = await Appointment.findAll({ where: { patientId: patient.id } });

    }


    return res.status(200).json({
        message: "Appointment fetched Successfully",
        success: true,
        user:req.user,
        appointment: appointments
    })
    

}