const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class CourseController {
  //[GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}).sortable(req),
      Course.countDocumentsDeleted(),
    ]).then(([courses, deleteCount]) =>
      res.render("me/stored-courses", {
        deleteCount,
        courses: mutipleMongooseToObject(courses),
      })
    );
  }

  //[GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) => {
        res.render("me/trash-courses", {
          courses: mutipleMongooseToObject(courses),
        });
      })
      .catch((error) => next(error));
  }
}

module.exports = new CourseController();
