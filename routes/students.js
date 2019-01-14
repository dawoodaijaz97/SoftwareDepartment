const {Student, validate} = require('../models/student'); 
const {Course} = require('../models/course');
const {User}=require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const faculty=require('../middleware/faculty');

router.get('/',auth, async (req, res) => {
  const students = await Student.find().sort('name');
  res.send(students);
});

router.post('/',[auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findById(req.body.courseID);
  if (!course) return res.status(400).send('Invalid Cousre.');
   
  const user=await   User.findOne({name:req.body.name});
  if (!user) return res.status(400).send('Invalid User');
  const student = new Student({ 
    name: user.name,
    currentSemester:req.body.currentSemester,
    CGPA:req.body.CGPA
  });

  let coursi={
      _id:course._id,
      name:course.name
  }
  student.coursesRunning.push(coursi);
  await student.save();
  
  res.send(student);
});

router.put('/:id',[auth,admin] ,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findById(req.body.courseID);
  if (!course) return res.status(400).send('Invalid Cousre.');

  let student = await Student.findById(req.params.id);
  
   if (!student) return res.status(404).send('The student with the given ID was not found.');
  
  student.CGPA= req.body.CGPA? req.body.CGPA:student.CGPA;
  student.name=req.body.name?req.body.name:student.name;
  student.currentSemester=req.body.currentSemester?req.body.currentSemester:student.currentSemester;

  let coursi={
      _id:course._id,
      name:course.name
  }
  student.coursesRunning.push(coursi);
  await student.save();
  
   
  res.send(student);
});

router.delete('/:id',[auth,admin], async (req, res) => {
  const student = await Student.findByIdAndRemove(req.params.id);

  if (!student) return res.status(404).send('The student with the given ID was not found.');

  res.send(student);
});

router.get('/:id',[auth,faculty] ,async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) return res.status(404).send('The student with the given ID was not found.');

  res.send(student);
});

module.exports = router; 