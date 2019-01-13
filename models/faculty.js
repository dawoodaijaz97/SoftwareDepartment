const Joi = require('joi');
const mongoose = require('mongoose');
const {courseSchema} = require('./course');

const Faculty = mongoose.model('Faculty', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  coursesTaught: { 
    type: [new mongoose.Schema({
        _id:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    })],  
    validate: {
        validator:function(v){
        return v && v.length>0 ;
        },
        message:'A course should have atleast one tag'
    }
  },
  DateEmployed: { 
    type: String, 
    required: true,
    
  }
  
  
}));

function validateFaculty(faculty) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    coursesID: Joi.objectId().required(),
    DateEmployed:Joi.string().required()
  };

  return Joi.validate(faculty, schema);
}

exports.Faculty = Faculty; 
exports.validate = validateFaculty;