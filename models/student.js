const Joi = require('joi');
const mongoose = require('mongoose');
const {courseSchema} = require('./course');

const Student = mongoose.model('Student', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  coursesRunning: { 
    type:[ new mongoose.Schema({
        _id:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    })],  
    required: true
  },
  currentSemester: { 
    type: Number, 
    required: true,
    
  },
  CGPA:{
      type:Number,
      required:true
  }
  
}));

function validateStudent(student) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    courseID: Joi.objectId().required(),
    currentSemester:Joi.number().required(),
    CGPA:Joi.number().required()
  };

  return Joi.validate(student, schema);
}

exports.Student = Student; 
exports.validate = validateStudent;