const Validator = require('validator');
const ValidText = require('./valid_text');
const ValidateFeedInputs = require('./feed');
const ValidateChangeInputs = require('./change');
const ValidateSleepInputs = require('./sleep');

const eventTypes = ['change', 'feed', 'sleep'];

const ValidEvent = (data) => {
  let errors = {};
  data.eventType = ValidText(data.eventType) ? data.eventType : '';
  data.eventDetails = buildEventDetails(data);

  if (Validator.isEmpty(data.eventType)) {
    errors.eventType = 'Event Type cannot be blank';
  }
  if (!Validator.isMongoId(data.eventDetails)) {
    errors.eventDetails = 'Invalid eventDetails'
  }

  let eventErrors;
  switch (data.eventType) {
    case 'change':
      eventErrors = ValidateChangeInputs(data.eventDetails);
      if (!eventErrors.isValid) {
        errors.eventErrors = eventErrors.errors;
      }
      break;

    case 'feed':
      eventErrors = ValidateFeedInputs(data.eventDetails);
      if (!eventErrors.isValid) {
        errors.eventErrors = eventErrors.errors;
      }
      break;
  
    case 'sleep':
      eventErrors = ValidateSleepInputs(data.eventDetails);
      if (!eventErrors.isValid) {
        errors.eventErrors = eventErrors.errors;
      }
      break;
  
    default:
      errors.eventType = 'Please enter valid event';
      break;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
};

module.exports = ValidEvent;