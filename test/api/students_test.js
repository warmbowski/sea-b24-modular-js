var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

require('../../server');

var expect = chai.expect;

describe('basic students crud', function() {
  var id;
  it('should be able to create a student', function(done) {
    chai.request('http://localhost:3000')
    .post('/api/students')
    .send({studentName: 'Calculus', priority: 1})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.studentName).to.eql('Fredford Bedford');
      expect(res.body).to.have.property('_id');
      id = res.body._id;
      done();
    });
  });

  it('should be able to get an index', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/students')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true;
      done();
    });
  });

  it('should be able to get a single student', function(done) {
    chai.request('http://localhost:3000')
    .get('/api/students/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.studentName).to.eql('Fredford Bedford');
      expect(res.body.priority).to.eql(1);
      done();
    });
  });

  it('should be able to update a student', function(done) {
    chai.request('http://localhost:3000')
    .put('/api/students/' + id)
    .send({studentName: 'changed student name'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.studentName).to.eql('changed student name');
      done();
    });
  });

  it('should be able to destroy a student', function(done) {
    chai.request('http://localhost:3000')
    .delete('/api/students/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('success!');
      done();
    });
  });
});