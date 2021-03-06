export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const APPLY_FILTER = "APPLY_FILTER";

export const openModal = (modal,childId,eventId) => ({
  type: OPEN_MODAL,
  modal,
  childId,
  eventId
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const applyFilter = filter => ({
  type: APPLY_FILTER,
  filter
});