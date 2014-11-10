var mongoose = require('mongoose');

var enrollmentSchema = mongoose.Schema({
  studentId: {type: String},
  courseId: {type: String}
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
