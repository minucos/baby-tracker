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