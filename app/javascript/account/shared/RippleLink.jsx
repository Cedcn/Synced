import React, { PropTypes } from 'react';
import Ripple from 'react-toolbox/lib/ripple';
import { NavLink } from 'react-router-dom';

const CustomLink = props => {
  const { children, theme, ...other } = props;
  return (
    <NavLink {...other} style={{ position: 'relative' }}>
      {children}
    </NavLink>
  );
};

CustomLink.propTypes = {
  children: PropTypes.array,
  theme: PropTypes.object
};

const RippleLink = Ripple({ spread: 1 })(CustomLink);

export default RippleLink;
