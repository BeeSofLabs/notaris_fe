import React from 'react'
import PropTypes from 'prop-types'
import { Upload } from 'antd'
const { Dragger } = Upload;

/* eslint-disable */
const UploadInput = ({
  placeholder,
  name,
  type,
  label,
  error,
  optional,
  value,
  onChange,
  rows,
  options
}) => (
  <div className="group-textarea-formik">
    <label htmlFor={name}>
      {label}
      {
        optional && <span className="status-input">*Optional</span>
      }
      <Dragger {...options}>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
      {error && <span className="error">{error}</span>}
    </label>
  </div>
)

UploadInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  optional: PropTypes.bool,
  type: PropTypes.any,
}

export default UploadInput
