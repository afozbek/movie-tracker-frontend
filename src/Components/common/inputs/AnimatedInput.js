import React from "react";

const AnimatedInput = ({
  inputType,
  inputName,
  placeholder,
  changeHandler,
}) => {
  return (
    <div className="a-textInput">
      <input
        className="a-textInput__element -animate"
        placeholder=" "
        name={inputName}
        type={inputType}
        onChange={changeHandler}
      />

      <div className="a-textInput__placeholder">{placeholder}</div>

      <span className="a-textInput__pcAnimation"></span>
    </div>
  );
};

export default AnimatedInput;
