import Sequelize from 'sequelize';

import sequelize from '../lib/database.js';

 const Course = sequelize.define('course', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },  
     
    name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    

})

export default Course;