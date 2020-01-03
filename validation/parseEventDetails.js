const parseEventDetails = (data) => {
  let details = {};

  switch (data.eventType) {
    case 'sleep':
      details.timeSlept = parseInt(data.timeSlept);
      details.notes = data.notes;

      if (Array.isArray(data.options)) {
        details.options = data.options;
      } else {
        details.options = [data.options];
      }

      return details;
      
    case 'change':
      details.changedBy = data.changedBy;
      details.notes = data.notes;
      
      if (Array.isArray(data.options)) {
        details.options = data.options;
      } else {
        details.options = [data.options];
      }
      if (Array.isArray(data.contents)) {
        details.contents = data.contents;
      } else {
        details.contents = [data.contents];
      }

      return details;
      
    case 'feed':
      details.foodFrom = data.foodFrom;
      details.foodType = data.foodType;
      details.notes = data.notes;
      details.fedBy = data.fedBy;

      if (Array.isArray(data.options)) {
        details.options = data.options;
      } else {
        details.options = [data.options];
      }

      return details;

    default:
      return details;
  }
};

module.exports = parseEventDetails;