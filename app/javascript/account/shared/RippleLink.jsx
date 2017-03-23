import React, { PropTypes } from 'react';
import Ripple from 'react-toolbox/lib/ripple';
import { Link } from 'react-router-dom';

const CustomLink = props => {
  const { children, theme, ...other } = props;
  return (
    <Link {...other} style={{ position: 'relative' }}>
      {children}
    </Link>
  );
};

CustomLink.propTypes = {
  children: PropTypes.array,
  theme: PropTypes.object
};

const RippleLink = Ripple({ spread: 1 })(CustomLink);

export default RippleLink;
