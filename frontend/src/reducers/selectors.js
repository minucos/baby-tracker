export const selectCarers = (state) => {
  let others = Object.values(state.entities.users);
  let currentUser = [state.session.user];
  return currentUser.concat(others);
}