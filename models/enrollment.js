'use strict';
var mongoose = require('mongoose');

var enrollmentSchema = mongoose.Schema({
  verified: {type:Boolean, default: false},
  studentId: {type: String},
  courseId: {type: String}
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
