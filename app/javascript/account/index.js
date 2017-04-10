import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import Account from './Account';

import * as stores from './stores';

const account = () => {
  render(
    <Provider {...stores}>
      <Account />
    </Provider>, document.getElementById('account'));
};

export default account;
