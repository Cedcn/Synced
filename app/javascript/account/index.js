import React from 'react';
import { render } from 'react-dom';

import Account from './Account';

const account = () => {
  render(<Account />, document.getElementById('account'));
};

export default account;
