import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Account from './Account';

const account = () => {
  injectTapEventPlugin();
  render(
    <MuiThemeProvider>
      <Account />
    </MuiThemeProvider>,
  document.getElementById('account'));
};

export default account;
