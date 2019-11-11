import PropTypes from 'prop-types';
import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/id';

const dateFormat = 'DD MMMM YYYY';

const DateInput = ({ 
  name,
  label,
  error,
  onChange,
  value, 
  placeholder
}) => (
  <div className="date-input">
    <label htmlFor={name}>
      {label}
      <DatePicker 
        format={dateFormat} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        dropdownClassName="dropdown-calendar"
      />
      {error && <span className="error">{error}</span>}
    </label>
  </div>
);

DateInput.protoTypes = {
  
};

export default DateInput;
