export const selectCarers = (state) => {
  let others = Object.values(state.entities.users);
  let currentUser = [state.session.user];
  return currentUser.concat(others);
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

export const eventsByWeek = (events,date) => {
  let dates = {};

  for (let i = 0; i < 7; i++) {
    
  }
};

export const eventsByYear = (events,date) => {

};

export const eventsByMonth = (events,date) => {

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