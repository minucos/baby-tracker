const Validator = require('validator');
const validText = require('./valid_text');

const ValidSleep = (data) => {
  let errors = {};

  data.startTime = validText(data.startTime) ? data.startTime : '';
  data.endTime = validText(data.endTime) ? data.endTime : '';

  if (Validator.isEmpty(data.startTime)) {
    errors.startTime = 'startTime cannot be blank';
  }
  if (Validator.isEmpty(data.endTime)) {
    errors.endTime = 'endTime cannot be blank';
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

module.exports = ValidSleep;