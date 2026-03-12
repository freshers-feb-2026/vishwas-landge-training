import User from './user.js';
import Course from './course.js';

// user.hasMany(course); //just tell sequelize that user has many course and course belongs to user
// //it doesnt do anything just add sum methods

// course.belongsTo(user); //This creates the foreign key column:courses.userId


// User.belongsToMany(Course, { through: "user_courses" });
// Course.belongsToMany(User, { through: "user_courses" });


User.belongsToMany(Course, { 
  through: "user_courses",
  foreignKey: "user_id"
});

Course.belongsToMany(User, { 
  through: "user_courses",
  foreignKey: "course_id"
});


export {
    User,
    Course
}