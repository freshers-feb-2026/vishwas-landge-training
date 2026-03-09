import Squelize from "sequelize";
import dotenv from "dotenv"
dotenv.config();

// const pool = mysql.createPool({
//         host: process.env.MYSQL_HOST ,
//         user: process.env.MYSQL_USER,
//         database: process.env.MYSQL_DATABASE,
//         password: process.env.MYSQL_PASSWORD,
//     })
    
// export default pool.promise();

const sequelize = new Squelize(

    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: "mysql",
    }
);

export default sequelize;