import React from 'react';

const moment = require('moment');

function User(props) {
  // console.log('user', props);
  return (
    <div className="qa-answer">
      by
      {' '}
      <b>{props.name}</b>
      {' '}
      {moment(props.date).format('MMMM Do YYYY')}
      {' '}
      |
      {' '}
      <span>
        Helpful?
        {' '}
        <u>Yes</u>
        {' '}
        (
        {props.helpful}
        )
      </span>
      {' '}
      |
      {' '}
      <span>Report</span>

    </div>
  );
}

export default User;
