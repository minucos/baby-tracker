import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';

const ChildIndexItem = (props) => {
  let { child } = props;

  const printAge = () => {
    let diff = ((Date.now() - new Date(child.dob)) / 86400000 / 365).toFixed(1);

    if (diff < 1) {
      return `${Math.round(12 * diff)} months`;
    }
    return `${diff} years`;
  }

  return(
    <Link to={`/child/${child._id}`}>
      <div className="child-index">
        <div className="profile-pic">
          <FontAwesomeIcon icon={faBaby} />
        </div>
        <div>{child.name}</div>
        <div>{printAge()}</div>
      </div>
    </Link>
  )
};

export default ChildIndexItem;