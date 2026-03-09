import mysql from 'mysql2';

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: 'demo_one',
        password:"mysql"
    })
    
export default pool.promise();