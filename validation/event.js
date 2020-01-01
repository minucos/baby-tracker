const Validator = require('validator');
const ValidText = require('./valid_text');

const changeTypes = [
  'pee',
  'poop'
]
const poopOptions = [
  'sticky',
  'dark',
  'yellow',
  'green',
  'hard',
  'loose'
];
const peeOptions = [
  'light',
  'regular',
  'heavy',
];

const ValidChange = (data) => {
  let errors = {};
  data.name = ValidText(data.name) ? data.name : '';
  data.notes = ValidText(data.notes) ? data.notes : '';
  data.changeType = Array.isArray(data.changeType) ? data.changeType : [];

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name cannot be blank';
  }  
  if (!Validator.isMongoId(data.recorder)) {
    errors.recorder = 'recorder is invalid';
  }
  if (!data.changeType.every(el => changeTypes.includes(el))) {
    errors.changeType = "Invalid change type";
  }
  if (!data.changeType.includes('pee')) {
    if (data.changeOptions.every(el => changeTypes.includes(el))) 
    errors.changeType = "Invalid change options";
  }

}