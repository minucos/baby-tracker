const Validator = require("validator");
const validText = require('./valid_text');

const validateRegistration = (data) => {
  let errors = {};
  data.email = validText(data.email) ? data.email : '';
  data.fName = validText(data.fName) ? data.fName : '';
  data.lName = validText(data.lName) ? data.lName : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email can't be blank";
  }
  if (Validator.isEmpty(data.fName)) {
    errors.fName = "First name can't be blank";
  }
  if (Validator.isEmpty(data.lName)) {
    errors.lName = "Last name can't be blank";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password can't be blank";
  }
  if (!Validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}

module.exports = validateRegistration;