'use strict';
var async = require('async');
var Enrollment = require('../models/enrollment');
var Student = require('../models/student');
var Course = require('../models/course');

module.exports = function(app) {
  app.get('/api/studentsincourse/:courseId', function(req, res) {
    Enrollment.find({courseId: req.params.courseId}, function(err, enrollments) {
      var studentsList = [];
      async.forEach (enrollments, function(enrollee, callback) {
        console.log('Processing ', enrollee);
        Student.findOne({_id: enrollee.studentId}, function(err, students) {
          console.log(students);
          studentsList.push(students);
        });
        callback();
      });
      console.log(studentsList);
      res.send('worked')
    });
  });
};
