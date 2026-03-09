import Sequelize from "sequelize";
import sequelize from "../lib/database.js";

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },


    name: Sequelize.STRING,
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,

    },

    // createdAt: { //automatcally created by sequelize AND Also updatedAt
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.NOW,

    // }

})

export default Product;