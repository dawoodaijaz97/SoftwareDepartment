

const express = require('express');
const users=require('../routes/users');
const auth=require('../routes/auth');
const courses=require('../routes/courses');
const attendances=require('../routes/attendances');
const faculties=require('../routes/faculties');
const students=require('../routes/students');



 module.exports = function(app) {
     app.use(express.json());
     app.use('/api/users', users);
     app.use('/api/auth', auth);
     app.use('/api/students', students);
     app.use('/api/faculties', faculties);
     app.use('/api/attendances', attendances);
     app.use('/api/courses', courses);


     

    
  }