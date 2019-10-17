import React from 'react'
import PropTypes from 'prop-types';

const  Status = ({
  children
}) => (
  <div className="status">
    {children}
  </div>
)

Status.propTypes = {
  children: PropTypes.any
}

export default Status