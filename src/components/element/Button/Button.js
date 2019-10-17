import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  children,
  onClick,
  className,
  disabled = true,
}) => (
  <button
    type="submit"
    className={`button-notaris ${className}`}
    onClick={!onClick ? null : onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.any,
  ]),
  children: PropTypes.string.isRequired,
  className: PropTypes.any,
  disabled: PropTypes.any,
}

export default Button
