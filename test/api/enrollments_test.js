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
    .send({enrollmentName: 'Calculus', priority: 1})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.enrollmentName).to.eql('Calculus');
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
      expect(res.body.enrollmentName).to.eql('Calculus');
      expect(res.body.priority).to.eql(1);
      done();
    });
  });

  it('should be able to update a enrollment', function(done) {
    chai.request('http://localhost:3000')
    .put('/api/enrollments/' + id)
    .send({enrollmentName: 'changed enrollment name'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.enrollmentName).to.eql('changed enrollment name');
      done();
    });
  });

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