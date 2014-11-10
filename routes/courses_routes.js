'use strict';
var Course = require('../models/course');

module.exports = function(app) {
  app.get('/api/courses', function(req, res) {
    Course.find({}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.get('/api/courses/:id', function(req, res) {
    Course.findOne({_id: req.params.id}, function(err, data) {
      if (err) return res.status(500).send('there was an error');
      res.json(data);
    });
  });

  app.post('/api/courses', function(req, res) {
    var course = new Course(req.body);
    course.save(function(err, data) {
      if (err) return res.status(500).send(err.errors);
      res.json(data);
    });
  });

  app.put('/api/courses/:id', function(req, res) {
    var course = req.body;
    delete course._id;
    Course.findOneAndUpdate({_id: req.params.id}, course, function(err, data) {
      if (err) return res.status(500).send(err.errors);
      res.json(data);
    });
  });

  app.delete('/api/courses/:id', function(req, res) {
    Course.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'success!'});
    });
  });
};
