import React from 'react';

import BaseInfo from './BaseInfo';
class Account extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div><BaseInfo /></div>
    );
  }
}

export default Account;
