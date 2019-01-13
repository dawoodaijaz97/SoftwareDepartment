const {Attendance, validate} = require('../models/attendance'); 
const {Course} = require('../models/course');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const {Student}=require('../models/student');
router.get('/', async (req, res) => {
  const attendances = await Attendance.find().sort('name');
  res.send(attendances);
});

router.post('/', [auth,admin],async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findById(req.body.courseID);
  if (!course) return res.status(400).send('Invalid Cousre.');

  const student = await Student.findById(req.body.studentID);
  if (!student) return res.status(400).send('Invalid Student.');

  const attendance = new Attendance({ 
        student:{
            _id:student._id,
            name:student.name
        },
        course:{
            _id:course._id,
            name:course.name
        },
        attendance:req.body.attendance


   });

  
  await attendance.save();
  
  res.send(attendance);
});

router.put('/:id',[auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findById(req.body.courseID);
  if (!course) return res.status(400).send('Invalid Cousre.');

  const student = await Student.findById(req.body.studentID);
  if (!student) return res.status(400).send('Invalid Student.');

  let attendance = await Attendance.findById(req.params.id);
  if (!attendance) return res.status(404).send('The attendance with the given ID was not found.');
  
   attendance = new Attendance({ 
    student:{
        _id:student._id,
        name:student._name
    },
    course:{
        _id:course._id,
        name:course._name
    },
    attendance:req.body.attendance


});
  await attendance.save();
  
   
  res.send(attendance);
});

router.delete('/:id',[auth,admin], async (req, res) => {
  const attendance = await Attendance.findByIdAndRemove(req.params.id);

  if (!attendance) return res.status(404).send('The attendance with the given ID was not found.');

  res.send(attendance);
});

router.get('/:id', async (req, res) => {
  const attendance = await Atendance.findById(req.params.id);

  if (!attendance) return res.status(404).send('The attendance with the given ID was not found.');

  res.send(attendance);
});

module.exports = router; 