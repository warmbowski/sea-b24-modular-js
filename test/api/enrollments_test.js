var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('basic enrollments crud', function() {
  var id;
  it('should be able to create a enrollment', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/enrollments')
    .send({studentId: '507f1f77bcf86cd799439011', courseId: '507f191e810c19729de860ea'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.studentId).to.eql('507f1f77bcf86cd799439011');
      expect(res.body.courseId).to.eql('507f191e810c19729de860ea');
      expect(res.body).to.have.property('_id');
      id = res.body._id;
      done();
    });
  });

  it('should be able to get an index', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/enrollments')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true;
      done();
    });
  });

  it('should be able to get a single enrollment', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/enrollments/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.studentId).to.eql('507f1f77bcf86cd799439011');
      expect(res.body.courseId).to.eql('507f191e810c19729de860ea');
      done();
    });
  });

  // it('should be able to update a enrollment', function(done) {
  //   chai.request('http://localhost:3000')
  //   .put('/api/enrollments/' + id)
  //   .send({studentId: 'changed enrollment name'})
  //   .end(function(err, res) {
  //     expect(err).to.eql(null);
  //     expect(res.body.studentId).to.eql('changed enrollment name');
  //     done();
  //   });
  // });

  it('should be able to destroy a enrollment', function(done) {
    chai.request('http://localhost:3000')
    .delete('/api/enrollments/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('success!');
      done();
    });
  });
});