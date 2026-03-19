
import { DataTypes } from "sequelize";
import sequelize from "../lib/database.js";
import {Doctor, Patient} from "./index.js";


const Appointment = sequelize.define("appointment", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },

    weekday: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    patientId: {
        type: DataTypes.INTEGER,
        references: {
            model: Patient,
            key: "id"
        }
    },
    doctorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Doctor,
            key: "id"
        }
    },
    start: {
        type: DataTypes.TIME,
        allowNull: false

    },
    end: {
        type: DataTypes.TIME,
        allowNull: false

    },
    
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    isCanceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

})

export default Appointment;