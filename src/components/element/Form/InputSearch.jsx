import PropTypes from 'prop-types';
import React from 'react';

const InputSearch = ({ id, value, onChange, placeholder }) => (
  <div className="search">
    <label forHtml="search">
      <input
        type={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  </div>
);

InputSearch.protoTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default InputSearch;
