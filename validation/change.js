const Validator = require('validator');
const ValidText = require('./valid_text');

const changeTypes = ['pee','poo'];
const poopOptions = ['regular','sticky','dark','green','hard','loose'];
const peeOptions = ['light','regular','heavy','pink'];

const ValidChange = (data) => {
  let errors = {};
  data.name = ValidText(data.name) ? data.name : '';
  data.changeType = Array.isArray(data.changeType) ? data.changeType : [];

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name cannot be blank';
  }  
  if (!Validator.isMongoId(data.recorder)) {
    errors.recorder = 'recorder is invalid';
  }
  if (!data.changeType.every(el => changeTypes.includes(el))) {
    errors.changeType = "Invalid contents";
  }
  if (!data.changeType.includes('pee')) {
    if (data.changeOptions.some(el => peeOptions.includes(el))) {
      errors.changeType = "Invalid change options";
    }
  }
  if (!data.changeType.includes('poo')) {
    if (data.changeOptions.some(el => poopOptions.includes(el))) {
      errors.changeType = "Invalid change options";
    }
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};

module.exports = ValidChange;