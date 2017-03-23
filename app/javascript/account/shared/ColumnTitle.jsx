import React, { PropTypes } from 'react';

const ColumnTitle = props => {
  return (
    <div className="column-title">
      <h3>{props.title}</h3>
      <span>{props.en}</span>
    </div>
  );
};

ColumnTitle.defaultProps = {
  title: '个人中心',
  en: ''
};

ColumnTitle.propTypes = {
  title: PropTypes.string,
  en: PropTypes.string
};

export default ColumnTitle;
