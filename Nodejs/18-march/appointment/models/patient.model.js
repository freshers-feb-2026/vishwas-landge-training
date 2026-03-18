
import { DataTypes } from "sequelize";
import sequelize from "../lib/database.js";
import {User} from "./index.js";


const Patient = sequelize.define("patient", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },

    age: {
        type: DataTypes.INTEGER,
    },

    symtoms: {
        type: DataTypes.STRING,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    }


})

export default Patient;