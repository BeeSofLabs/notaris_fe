import React from 'react'
import PropTypes from 'prop-types'
/* eslint-disable */
const Textarea = ({
  placeholder,
  name,
  type,
  label,
  error,
  optional,
  value,
  onChange,
  rows
}) => (
  <div className="group-textarea-formik">
    <label htmlFor={name}>
      {label}
      {
        optional && <span className="status-input">*Optional</span>
      }
      <textarea
        name={name}
        placeholder={placeholder}
        className="formik-input"
        id={name}
        value={value}
        onChange={onChange}
        rows={rows} 
      />
      {error && <span className="error">{error}</span>}
    </label>
  </div>
)

Textarea.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  optional: PropTypes.bool,
  type: PropTypes.any,
}

export default Textarea
