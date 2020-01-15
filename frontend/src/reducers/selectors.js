export const selectCarers = (state) => {
  let others = Object.values(state.entities.users);
  let currentUser = [state.session.user];
  return currentUser.concat(others);
}

export const filterEvents = (state, type) => {
  let events = Object.values(state.entities.events).filter(event => event.eventType === type);

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