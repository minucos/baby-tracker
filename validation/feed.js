const Validator = require('validator');
const validText = require('./valid_text');

const startingOptions = ['left', 'right'];

const ValidFeed = (data) => {
  let errors = {};
  data.foodFrom = validText(data.foodFrom) ? data.foodFrom : '';
  data.foodType = validText(data.foodType) ? data.foodType : '';
  data.fedBy = validText(data.fedBy) ? data.fedBy : '';
  data.startTime = validText(data.startTime) ? data.startTime : '';
  data.startingSide = validText(data.startingSide) ? data.startingSide : '';
  data.endTime = validText(data.endTime) ? data.endTime : '';

  if (Validator.isEmpty(data.foodFrom)) {
    errors.foodFrom = 'Please enter how child was fed';
  }
  if (Validator.isEmpty(data.foodType)) {
    errors.dob = 'Please enter what type of food was given';
  }
  if (Validator.isEmpty(data.fedBy)) {
    errors.parent = 'fedBy cannot be blank';
  }
  if (Validator.isEmpty(data.startTime)) {
    errors.startTime = 'startTime cannot be blank';
  }
  if (data.foodFrom === 'breast') {
    if (!startingOptions.includes((data.startingSide))) {
      errors.startingSide = 'startingSide invalid';
    }
    if (Validator.isEmpty(data.startingSide)) {
      errors.startingSide = 'startingSide cannot be blank';
    }
  }
  if (Validator.isEmpty(data.endTime)) {
    errors.endTime = 'endTime cannot be blank';
  }
  if (!Validator.isMongoId(data.fedBy)) {
    errors.parent = 'fedBy is invalid';
  }
  
  data.startTime = new Date(data.startTime);
  data.endTime = new Date(data.endTime);

  if (isNaN(data.startTime.getDate())) {
    errors.startTime = 'please enter a valid startTime';
  }
  if (isNaN(data.endTime.getDate())) {
    errors.endTime = 'please enter a valid endTime';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};

module.exports = ValidFeed;