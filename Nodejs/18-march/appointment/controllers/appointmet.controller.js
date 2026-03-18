import { Appointment, Patient } from "../models/index.js";

export const createAppointment = async (req, res) => {

    const { doctorId } = req.params;

    const {
        start,
        end,
        date } = req.body;

    const patient = await Patient.findOne({ where: { userId: req.user.id } })
     


    const newAppointment = await Appointment.create({
        start, end, data, patientId: patient.id, doctorId});


       return res.status(200).json({
            message:"Appointment Created Successfully",
            success:true,
            appointment:newAppointment
        })


}