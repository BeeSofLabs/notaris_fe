import PropTypes from 'prop-types';
import React from 'react';

const Card = ({ children }) => <div className="card">{children}</div>;

Card.protoType = {
  children: PropTypes.any
};

export default Card;
