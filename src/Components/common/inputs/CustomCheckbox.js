import React from "react";

const CustomCheckbox = ({ checked, name, id, checkbox, labelText }) => {
  return (
    <div className="a-customCheckbox">
      <input
        className="a-customCheckbox__confirm"
        type="checkbox"
        checked={checked}
        name={name}
        id={id}
      />

      <label
        className="a-customCheckbox__confirmLabel"
        data-content={checkbox}
        htmlFor={id}
      >
        <span className="a-customCheckbox__labelText">{labelText}</span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
