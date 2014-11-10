'use strict';
var Enrollment = require('../models/enrollment');

module.exports = function(app) {
  app.get('/api/enrollments', function(req, res) {
    Enrollment.find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.get('/api/enrollments/:id', function(req, res) {
    Enrollment.findOne({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.post('/api/enrollments', function(req, res) {
    var enrollment = new Enrollment(req.body);
    enrollment.save(function(err, data) {
      if (err) return res.status(500).send(err.errors);
      res.json(data);
    });
  });

  app.put('/api/enrollments/:id', function(req, res) {
    var enrollment = req.body;
    delete enrollment._id;
    Enrollment.findOneAndUpdate({_id: req.params.id}, enrollment, function(err, data) {
      if (err) return res.status(500).send(err.errors);
      res.json(data);
    });
  });

  app.delete('/api/enrollments/:id', function(req, res) {
    Enrollment.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'success!'});
    });
  });
};
