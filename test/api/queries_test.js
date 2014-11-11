'use strict';
var Enrollment = require('../../models/enrollment');
var Student = require('../../models/student');
var Course = require('../../models/course');

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('queries', function() {
  var courseIdForApi;
  var studentIdForApi;

  before(function(done) {
    // add data to database
    var c = new Course({courseName: 'Calculus'});
    c.save(function(err, data) {
      courseIdForApi = String(data._id);
      var s1 = new Student({studentName: 'Fredford'});
      s1.save(function(err, data) {
        studentIdForApi = String(data._id);
        var e1 = new Enrollment({courseId: courseIdForApi, studentId: s1._id});
        e1.save(function(err, data) {
        });
      });
      var s2 = new Student({studentName: 'Bedford'});
      s2.save(function(err, data) {
        var e2 = new Enrollment({courseId: courseIdForApi, studentId: s2._id})
        e2.save(function(err, data) {
          done();
        });
      });
    });
  });
  
  it('lists students enrolled in a course', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/studentsincourse/' + courseIdForApi)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body._id).to.eql(courseIdForApi);
      expect(res.body.studentsList).to.be.an('array');
      done();
    });
  });
  
  it('lists courses enrolled in by a student', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/studenthascourses/' + studentIdForApi)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body._id).to.eql(studentIdForApi);
      expect(res.body.coursesList).to.be.an('array');
      done();
    });
  });

});