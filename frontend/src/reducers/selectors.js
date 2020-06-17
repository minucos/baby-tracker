export const selectCarers = (carersArr) => {
  let carersObj = {};

  carersArr.forEach(carer => carersObj[carer._id] = carer)

  return carersObj;
}

export const filterEvents = (state, type, childId) => {
  let events = Object.values(state.entities.events)
    .filter(event => event.eventType === type && event.child === childId);

  return events.sort((a, b) => {
    let aDate = a.eventDetails.endTime ? a.eventDetails.endTime : a.eventDetails.startTime;
    let bDate = b.eventDetails.endTime ? b.eventDetails.endTime : b.eventDetails.startTime;
    let dateOne = new Date(aDate);
    let dateTwo = new Date(bDate);

    return dateTwo - dateOne;
  });
};

export const sortEvents = ({ entities }) => {
  let events = Object.values(entities.events);

  return events.sort((a,b) => {
    let aDate = a.eventDetails.endTime ? a.eventDetails.endTime : a.eventDetails.startTime;
    let bDate = b.eventDetails.endTime ? b.eventDetails.endTime : b.eventDetails.startTime;
    let dateOne = new Date(aDate);
    let dateTwo = new Date(bDate);
    
    return dateTwo-dateOne;
  });
};

export const countEvents = (events) => {
  let count = {};

  Object.values(events).forEach(event => {
      let date = new Date(event.eventDetails.startTime).toLocaleDateString();
      let type = event.eventType;
      
      if (count[date]) {
        count[date][type] ? count[date][type]++ : count[date][type] = 1;

      } else {
        count[date] = {};
        count[date][type] = 1;
      }
  });

  return Object.keys(count).map(date => {
    let obj = {};
    obj['date'] = date;


    Object.keys(count[date]).forEach(type => {
      obj[type] = count[date][type];
    })
    
    return obj;
  });
};

export const countByUser = (events, users) => {
  let count = {};

  Object.values(events).forEach(event => {
    let type = event.eventType;
    let userId = event.recorder._id;

    if (count[userId]) {
      count[userId][type] ? count[userId][type]++ : count[userId][type] = 1;

    } else {
      count[userId] = {};
      count[userId][type] = 1;
    }
  });

  return Object.keys(count).map(userId => {
    let obj = {};
    obj['user'] = users[userId];


    Object.keys(count[userId]).forEach(type => {
      obj[type] = count[userId][type];
    })

    return obj;
  });
};

export const eventsByRange = (events,range,currDate) => {
  let date = new Date(currDate);
  let dates = {};

  for (let i = 0; i < range; i++) {
    dates[date.toLocaleDateString()] = true;
    date.setDate(date.getDate() - 1);
  };

  return events.filter(event => dates[event.date] );
};

export const eventsByRange2 = (events,range,currDate) => {
  let date = new Date(currDate);
  let dates = {};

  for (let i = 0; i < range; i++) {
    dates[date.toLocaleDateString()] = true;
    date.setDate(date.getDate() - 1);
  };

  return events.filter(event => {
    let eventDate = new Date(event.createDate).toLocaleDateString();
    return dates[eventDate];
  });
};

export const calcTime = date => {
  let UTCtime = (new Date() - new Date(date)) / (1000 * 60 * 60);
  let offset = new Date().getTimezoneOffset() / 60;

  return UTCtime - offset;
};

export const applyOffset = date => {
  let UTCdate = new Date(date);
  let offset = UTCdate.getTime() + UTCdate.getTimezoneOffset() * 60000;
  return new Date(offset);
};

export const calcDuration = (start, end) => {
  let startTime = new Date(start);
  let endTime = new Date(end);

  return ((endTime - startTime) / 1000 / 3600);
};