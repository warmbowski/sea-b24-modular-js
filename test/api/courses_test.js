var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('basic courses crud', function() {
  var id;
  it('should be able to create a course', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/courses')
    .send({courseName: 'Calculus'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.courseName).to.eql('Calculus');
      expect(res.body).to.have.property('_id');
      id = res.body._id;
      done();
    });
  });

  it('should be able to get an index', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/courses')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true;
      done();
    });
  });

  it('should be able to get a single course', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/courses/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.courseName).to.eql('Calculus');
      done();
    });
  });

  it('should be able to update a course', function(done) {
    chai.request('http://localhost:3000')
    .put('/api/courses/' + id)
    .send({courseName: 'changed course name'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.courseName).to.eql('changed course name');
      done();
    });
  });

  it('should be able to destroy a course', function(done) {
    chai.request('http://localhost:3000')
    .delete('/api/courses/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('success!');
      done();
    });
  });
});