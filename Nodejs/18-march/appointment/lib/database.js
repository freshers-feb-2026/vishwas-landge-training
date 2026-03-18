
import {Sequelize} from "sequelize";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "../configs/config.js";


const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  
    // database:DB_DATABASE,
    // password:DB_PASSWORD,
    // username:DB_USER,
    host:DB_HOST,
    dialect:"postgres"
    
   
})




export default sequelize;