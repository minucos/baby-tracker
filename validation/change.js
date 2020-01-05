const Validator = require('validator');
const ValidText = require('./valid_text');

const changeTypes = ['pee','poo'];
const poopOptions = ['yellow/brown','sticky','black','green','hard','loose'];
const peeOptions = ['light','dark','pink'];

const ValidChange = (data) => {
  let errors = {};

  data.changeTime = ValidText(data.changeTime) ? data.changeTime : '';

  if (!Validator.isMongoId(data.changedBy)) {
    errors.changedBy = 'recorder is invalid';
  }
  if (!data.contents.every(el => changeTypes.includes(el))) {
    errors.contents = "Invalid contents";
  }
  if (!data.contents.includes('pee')) {
    if (data.options.some(el => peeOptions.includes(el))) {
      errors.options = "Invalid change options";
    }
  }
  if (!data.contents.includes('poo')) {
    if (data.options.some(el => poopOptions.includes(el))) {
      errors.options = "Invalid change options";
    }
  }
  if (Validator.isEmpty(data.changeTime)) {
    errors.changetime = 'changeTime cannot be blank';
  }

  data.changeTime = new Date(data.changeTime);

  if (isNaN(data.changeTime.getDate())) {
    errors.changeTime = 'please enter a valid changeTime';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};

module.exports = ValidChange;