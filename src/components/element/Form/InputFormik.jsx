import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
/* eslint-disable */
const InputFormik = ({
  placeholder,
  name,
  type,
  label,
  error,
  optional,
}) => (
  <div className="group-input-formik">
    <label htmlFor={name}>
      {label}
      {
        optional && <span className="status-input">*Optional</span>
      }
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="formik-input"
        id={name}
      />
      {error && <span className="error">{error}</span>}

    </label>
  </div>
)

InputFormik.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  optional: PropTypes.bool,
  type: PropTypes.any,
}

export default InputFormik
