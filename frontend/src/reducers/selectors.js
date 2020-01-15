export const selectCarers = (state) => {
  let others = Object.values(state.entities.users);
  let currentUser = [state.session.user];
  return currentUser.concat(others);
}

export const filterEvents = (state, type) => {
  let events = Object.values(state.entities.events).filter(event => event.eventType === type);

  return events.sort((a, b) => {
    let dateOne = new Date(a.eventDetails.startTime);
    let dateTwo = new Date(b.eventDetails.startTime);

    return dateTwo - dateOne;
  });
};

export const sortEvents = ({ entities }) => {
  let events = Object.values(entities.events);

  return events.sort((a,b) => {
    let dateOne = new Date(a.eventDetails.startTime);
    let dateTwo = new Date(b.eventDetails.startTime);
    
    return dateTwo-dateOne;
  });
};