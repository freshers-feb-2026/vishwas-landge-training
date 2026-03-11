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
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [3, 50]
        },
        get(){
            console.log("in getter this : " , this)
            const rawValue = this.getDataValue("name");
            return rawValue ? rawValue.toUpperCase() : null;
        },
        set(value){
            let newValue = value.trim().toUpperCase();
            this.setDataValue("name", newValue);
        }
    },

    age: {
        optional: true,
        type: Sequelize.INTEGER
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    } 

}, {
    paranoid: true
})

export default User;