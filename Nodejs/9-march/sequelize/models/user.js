import Sequelize from "sequelize";
import sequelize from "../lib/database.js";

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        allowNull: false,
        type: Sequelize.STRING
    },

    age: {
        optional: true,
        type: Sequelize.INTEGER
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    }

})

export default User;