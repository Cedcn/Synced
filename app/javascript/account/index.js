import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'react-css-themr';

import theme from './theme';
import Account from './Account';

const account = () => {
  render(
    <ThemeProvider theme={theme}>
      <Account />
    </ThemeProvider>, document.getElementById('account'));
};

export default account;
