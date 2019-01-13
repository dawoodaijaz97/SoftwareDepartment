const Joi = require('joi');
const mongoose = require('mongoose');


const Attendance = mongoose.model('Attendance', new mongoose.Schema({
  student: {
    type: new mongoose.Schema({
      _id:{
          type:String,
          required:true
      },
      name:{
          type:String,
          required:true,
          trim: true, 
          minlength: 5,
          maxlength: 255
      }
    }),
    required: true,
    
  },
  course: {
    type: new mongoose.Schema({
      _id:{
          type:String,
          required:true
      },
      name:{
          type:String,
          required:true,
          trim: true, 
          minlength: 5,
          maxlength: 255
      }
    }),
    required: true,
    
  },

  attendance:{
      type:Number,
      required:true
  }
  
  
}));

function validateAttendance(attendance) {
  const schema = {
    studentID: Joi.objectId().min(5).max(50).required(),
    courseID: Joi.objectId().required(),
    attendance:Joi.number().required()
  };

  return Joi.validate(attendance, schema);
}

exports.Attendance = Attendance; 
exports.validate = validateAttendance;