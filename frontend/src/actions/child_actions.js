import * as ChildAPIUtil from '../util/child_api_util';

export const RECEIVE_CHILDREN = 'RECEIVE_CHILDREN';
export const RECEIVE_CHILD = 'RECEIVE_CHILD';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const RECEIVE_CHILD_ERRORS = 'RECEIVE_CHILD_ERRORS';

const receiveChildren = children => ({
  type: RECEIVE_CHILDREN,
  children
});

const receiveChild = child => ({
  type: RECEIVE_CHILD,
  child
});

const removeChild = child => ({
  type: REMOVE_CHILD,
  child
})

const receiveErrors = errors => ({
  type: RECEIVE_CHILD_ERRORS,
  errors
});

export const fetchChildren = id => dispatch => {
  return ChildAPIUtil.fetchChildren(id)
    .then(
      children => dispatch(receiveChildren(children.data)),
      errors => dispatch(receiveErrors(errors))
    )  
};

export const fetchChild = (userId, childId) => dispatch => {
  return ChildAPIUtil.fetchChild(userId,childId)
    .then(
      child => dispatch(receiveChild(child.data)),
      errors => dispatch(receiveErrors(errors))
    )
};

export const createChild = (userId, child) => dispatch => {
  return ChildAPIUtil.createChild(userId,child)
    .then(
      child => dispatch(receiveChild(child.data)),
      errors => dispatch(receiveErrors(errors))
    )
};

export const deleteChild = (userId, childId) => dispatch => {
  return ChildAPIUtil.deleteChild(userId,childId)
    .then(
      child => dispatch(removeChild(child.data)),
      errors => dispatch(receiveErrors(errors))
    )
};

export const addCarer = (userId, childId, carerId) => dispatch => {
  return ChildAPIUtil.addCarer(userId,childId, carerId)
    .then(
      child => dispatch(receiveChild(child.data)),
      errors => dispatch(receiveErrors(errors))
    )
};