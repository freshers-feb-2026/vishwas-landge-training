import { DataTypes } from "sequelize";
import sequelize from "../lib/database.js";
import {Doctor} from "./index.js";

const Availability = sequelize.define("availability", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    weekday: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 6,
        },
    },

    start: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    end: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Doctor, key:"id"}
    },

    slots: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
    },

    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: "availabilities",
    timestamps: true,
});

export default Availability;