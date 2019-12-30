const Validator = require('validator');
const validText = require('./valid_text');

const validChild = (data) => {
  let errors = {};
  data.name = validText(data.name) ? data.name : '';
  data.sex = validText(data.sex) ? data.sex : '';
  data.dob = validText(data.dob) ? data.dob : '';
  
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name cannot be blank';
  }
  if (Validator.isEmpty(data.sex)) {
    errors.dob = 'Sex cannot be blank';
  }
  if (new Date(data.dob) === 'Invalid Date') {
    errors.dob = 'Date of Birth is not valid';
  }
  if (new Date(data.dob) > Date.now()) {
    errors.dob = 'Date of Birth cannot be in the future';
  }
  if (Validator.isEmpty(data.parentId)) {
    errors.parent = 'parentId cannot be blank';
  }
  if (!Validator.isMongoId(data.parentId)) {
    errors.parent = 'parentId is invalid';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};

module.exports = validChild;