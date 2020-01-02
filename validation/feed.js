const Validator = require('validator');
const validText = require('./valid_text');

const ValidFeed = (data) => {
  let errors = {};
  data.foodFrom = validText(data.foodFrom) ? data.foodFrom : '';
  data.foodType = validText(data.foodType) ? data.foodType : '';

  if (Validator.isEmpty(data.foodFrom)) {
    errors.foodFrom = 'Please enter how child was fed';
  }
  if (Validator.isEmpty(data.foodType)) {
    errors.dob = 'Please enter what type of food was given';
  }
  if (Validator.isEmpty(data.fedBy)) {
    errors.parent = 'fedBy cannot be blank';
  }
  if (!Validator.isMongoId(data.fedBy)) {
    errors.parent = 'fedBy is invalid';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};

module.exports = ValidFeed;