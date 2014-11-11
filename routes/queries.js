'use strict';
var eachAsync = require('each-async');
var Enrollment = require('../models/enrollment');
var Student = require('../models/student');
var Course = require('../models/course');

module.exports = function(app) {

  app.get('/api/studentsincourse/:courseId', function(req, res) {
    Course.findOne({_id: req.params.courseId}, function(err, course) {
      if (err) return res.status(500).send('there was an error');

      var inCourse = course.toObject();
      Enrollment.find({courseId: course._id}, function(err, enrollments) {
        if (err) return res.status(500).send('there was an error');

        var studentsList = [];
        eachAsync(enrollments, function(enrollee, index, callback) {
          Student.findOne({_id: enrollee.studentId}, function(err, students) {
            if (err) return res.status(500).send('there was an error');

            studentsList.push(students);
            callback();
          });
        }, function(err) {
          if (err) return res.status(500).send('there was an error');

          inCourse.studentsList = studentsList;
          res.json(inCourse);
        });
      });
    });
  });

  app.get('/api/studenthascourses/:studentId', function(req, res) {
    Student.findOne({_id: req.params.studentId}, function(err, student) {
      if (err) return res.status(500).send('there was an error');

      var theStudent = student.toObject();
      Enrollment.find({studentId: student._id}, function(err, enrollments) {
        if (err) return res.status(500).send('there was an error');

        var coursesList = [];
        eachAsync(enrollments, function(enrollee, index, callback) {
          Course.findOne({_id: enrollee.courseId}, function(err, courses) {
            if (err) return res.status(500).send('there was an error');

            coursesList.push(courses);
            callback();
          });
        }, function(err) {
          if (err) return res.status(500).send('there was an error');

          theStudent.coursesList = coursesList;
          res.json(theStudent);
        });
      });
    });
  });
};
