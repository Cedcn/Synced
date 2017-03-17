import React from 'react';
import { render } from 'react-dom';

import particlesBG from './particlesBG';
import Sessions from './Sessions';

const account = () => {
  particlesBG();
  render(<Sessions />, document.getElementById('sessions'));
};

export default account;
