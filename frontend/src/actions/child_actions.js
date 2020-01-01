import * as ChildAPIUtil from '../util/child_api_util';

export const RECEIVE_CHILDREN = 'RECEIVE_CHILDREN';
export const RECEIVE_CHILD_ERRORS = 'RECEIVE_CHILD_ERRORS';

const receiveChildren = children => ({
  type: RECEIVE_CHILDREN,
  children
});

const receiveErrors = errors => ({
  type: RECEIVE_CHILD_ERRORS,
  errors
});

export const fetchChildren = id => dispatch => {
  return ChildAPIUtil.fetchChildren(id)
    .then(
      children => dispatch(receiveChildren(children)),
      errors => dispatch(receiveErrors(errors))
    )  
};

export const fetchChild = (userId, childId) => dispatch => {
  return ChildAPIUtil.fetchChild(userId,childId)
    .then(
      child => dispatch(receiveChild(child)),
      errors => dispatch(receiveErrors(errors))
    )
};