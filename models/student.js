var studentSchema = mongoose.Schema({
  studentName: {type: String},
  studentNum: {type: Number}
});

module.exports = mongoose.model('Student', studentSchema);