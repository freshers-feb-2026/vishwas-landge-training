import User from "./user.model.js";
import Doctor from "./doctor.model.js";
import Patient from "./patient.model.js";
import Appointment from "./appointment.model.js";
import Availability from "./avaibility.model.js";


User.hasOne(Patient ,
    {
        foreignKey:"userId",
        as : "patient"
    }
);

User.hasOne(Doctor, {
    foreignKey:"userId",
    as : "doctor"
})

Patient.belongsTo(User , {
    foreignKey:"userId"
})

Doctor.belongsTo(User , {
    foreignKey:"userId",
})

// =======================================


Patient.hasMany(Appointment, {
    foreignKey: "patientId",
    as: "appointments"
});

Appointment.belongsTo(Patient, {
    foreignKey: "patientId",
    as: "patient"
})

Doctor.hasMany(Appointment, {
    foreignKey: "doctorId",
    as: "appointments"
});


Appointment.belongsTo(Doctor, {

    foreignKey: "doctorId",
    as: "doctor"

})

// =======================================


Doctor.hasMany(Availability, {

    foreignKey: "doctorId",
    as: "availabilities"

})

Availability.belongsTo(Doctor, {
    foreignKey: "doctorId",
    as: "doctor"
})


// =======================================


export {
    Doctor,
    Patient,
    Appointment,
    Availability,
    User
}