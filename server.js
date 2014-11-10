'use strict';
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URL || 'mongodb://localhost/school_development');

require('./routes/courses_routes')(app);
require('./routes/enrollments_routes')(app);
require('./routes/students_routes')(app);
require('./routes/queries')(app);

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log('server running on port: %d', app.get('port'));
});
