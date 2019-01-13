const {Course, validate} = require('../models/course'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');

router.get('/',auth, async (req, res) => {
  const courses = await Course.find().sort('name');
  res.send(courses);
});

router.post('/',[auth,admin] ,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course({ 
    name: req.body.name,
    semester: req.body.semester,
    creditHours: req.body.creditHours
  });
  course = await course.save();
  
  res.send(course);
});

router.put('/:id',[auth,admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      semester: req.body.semester,
      creditHours: req.body.creditHours
    }, { new: true });

  if (!course) return res.status(404).send('The course with the given ID was not found.');
  
  res.send(course);
});

router.delete('/:id',[auth,admin], async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) return res.status(404).send('The course with the given ID was not found.');

  res.send(course);
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) return res.status(404).send('The course with the given ID was not found.');

  res.send(customer);
});

module.exports = router; 