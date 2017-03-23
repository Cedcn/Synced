import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'react-css-themr';
import { Provider } from 'mobx-react';

import theme from './theme';
import Account from './Account';

import * as stores from './stores';

const account = () => {
  render(
    <ThemeProvider theme={theme}>
      <Provider {...stores}>
        <Account />
      </Provider>
    </ThemeProvider>, document.getElementById('account'));
};

export default account;
