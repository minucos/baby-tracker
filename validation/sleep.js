const sleepOptions = ['deep','disturbed','sweaty','cold','']

const ValidSleep = (data) => {
  let errors = {};

  if (!Number.isInteger(data.timeSlept)) {
    errors.timeSlept = 'Please enter sleep time';
  }

  if (!data.options.every(el => sleepOptions.includes(el))) {
    errors.options = "Invalid sleep options";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};

module.exports = ValidSleep;