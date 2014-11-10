var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
  courseName: {type: String},
  courseNum: {type: Number}
});

module.exports = mongoose.model('Course', courseSchema);
