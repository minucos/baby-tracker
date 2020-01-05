const Validator = require('validator');
const ValidText = require('./valid_text');

const changeTypes = ['pee','poo'];
const poopOptions = ['yellow/brown','sticky','black','green','hard','loose'];
const peeOptions = ['light','dark','pink'];

const ValidChange = (data) => {
  let errors = {};
  debugger
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
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};

module.exports = ValidChange;