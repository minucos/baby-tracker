import React from 'react';
import { Link } from 'react-router-dom';

const ChildIndexItem = (props) => {
  let { child } = props;

  const printAge = () => {
    let diff = ((Date.now() - new Date(child.dob))/86400000/365).toFixed(1);

    if (diff < 1) {
      return `${Math.round(12*diff)} months`;
    }
    return `${diff} years`;
  }

  return(
    <Link to={`/child/${child._id}`}>
      <ul>
        <li>{child.name}</li>
        <li>{printAge()}</li>
      </ul>
    </Link>
  )
};

export default ChildIndexItem;