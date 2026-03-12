import Sequelize from "sequelize";
import sequelize from "../lib/database.js";



const Admin = sequelize.define("admin", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

        }
    },

    email:{
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }

} , {})

export default Admin;