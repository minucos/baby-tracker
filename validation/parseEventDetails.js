const parseEventDetails = (data) => {
  let details = {};

  switch (data.eventType) {
    case 'sleep':
      details.startTime = data.startTime;
      details.endTime = data.endTime;
      details.notes = data.notes;

      return details;
      
    case 'change':
      details.changedBy = data.changedBy;
      details.notes = data.notes;
      details.startTime = data.startTime;
      
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
      details.startTime = data.startTime;
      details.startingSide = data.startingSide;
      details.endTime = data.endTime;

      return details;

    default:
      return details;
  }
};

module.exports = parseEventDetails;