
import { DataTypes } from "sequelize";
import sequelize from "../lib/database.js";
import {User} from "./index.js";


const Doctor = sequelize.define("doctor", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },

    specialization: {

        type: DataTypes.STRING

    },

    // education:{
    //     type:DataTypes.STRING,
    // },

    // experience:DataTypes.INTEGER,

    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:"id"
        }
    }

})

export default Doctor;