import React from 'react'
import PropTypes from 'prop-types'

const DetailField = ({
  label,
  value
}) => (
  <div className="group-detail-field">
    <h5>{label}</h5>
    <div className="value-detail">{value}</div>
  </div>
)

DetailField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any
}

export default DetailField