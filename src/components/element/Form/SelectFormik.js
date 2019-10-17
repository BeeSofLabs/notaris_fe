import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select-me'

const s = {
  dd__wrapper: 'wrapper-select',
  dd__selectedOption: 'wrapper-select-option',
  dd__list: 'wrapper-list',
}
/* eslint-disable */
// const iconRenderer = isOpened => (
//   <img src="/assets/icon-dropdown.png" className={isOpened ? 'active-icon icon' : 'icon'} alt="icon"/>
// )

const SelectFormik = ({
  name,
  label,
  error,
  optional,
  options,
  onChange,
  value,
}) => (
  <div className="group-input-formik">
    <label htmlFor={name}>
      {label}
      {
        optional && <span className="status-input">*Optional</span>
      }
      <Select
        options={options}
        value={value}
        onChange={onChange}
        s={s}
        // iconRenderer={iconRenderer}
      />
      {error && <span className="error">{error}</span>}
    </label>
  </div>
)

SelectFormik.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  optional: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
}

export default SelectFormik
