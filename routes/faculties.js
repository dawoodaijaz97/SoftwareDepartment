const {Faculty, validate} = require('../models/faculty'); 
const {Course} = require('../models/course');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const {User}=require('../models/user');

router.get('/', async (req, res) => {
  const faculties = await Faculty.find().sort('name');
  res.send(faculties);
});

router.post('/', [auth,admin],async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findById(req.body.coursesID);
  if (!course) return res.status(400).send('Invalid Cousre.');

  const user=await   User.findOne({name:req.body.name});
  if (!user) return res.status(400).send('Invalid User');

  const faculty = new Faculty({ 
    name: user.name,
    DateEmployed:req.body.DateEmployed
  });

  let coursi={
      _id:course._id,
      name:course.name
  }
  faculty.coursesTaught.push(coursi)
  await faculty.save();
  
  res.send(faculty);
});

router.put('/:id',[auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findById(req.body.coursesID);
  if (!course) return res.status(400).send('Invalid Cousre.');

  let faculty = await Faculty.findById(req.params.id);
  
   if (!faculty) return res.status(404).send('The faculty with the given ID was not found.');
  
  

  let coursi={
      _id:course._id,
      name:course.name
  }
  faculty.coursesTaught.push(coursi)
  await faculty.save();
  
   
  res.send(faculty);
});

router.delete('/:id',[auth,admin], async (req, res) => {
  const faculty = await Faculty.findByIdAndRemove(req.params.id);

  if (!faculty) return res.status(404).send('The faculty with the given ID was not found.');

  res.send(faculty);
});

router.get('/:id', async (req, res) => {
  const faculty = await Faculty.findById(req.params.id);

  if (!faculty) return res.status(404).send('The faculty with the given ID was not found.');

  res.send(faculty);
});

module.exports = router; 