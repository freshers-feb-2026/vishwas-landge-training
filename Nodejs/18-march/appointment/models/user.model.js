
import { DataTypes } from "sequelize";
import sequelize from "../lib/database.js";


const User = sequelize.define("user", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email:{
        type: DataTypes.STRING,
        unique:true,
        allowNull:false

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },

    role :{
        type:DataTypes.ENUM,
        values:["doctor" , "patient"],
        allowNull:false
    },

}, {
    defaultScope: {
        attributes: { exclude: ["password"] }
    }
})

export default User;