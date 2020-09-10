import React from "react";

import AnimatedInput from "../common/inputs/AnimatedInput";
// import CustomCheckbox from "../common/inputs/CustomCheckbox";

const RegisterForm = ({ formSubmitHandler, inputChangeHandler }) => {
  return (
    <form className="m-loginForm" onSubmit={formSubmitHandler}>
      <h1 className="a-header">Register Page</h1>
      <div className="m-loginForm__group">
        <AnimatedInput
          placeholder="First Name"
          animateBorder
          inputType="text"
          inputName="firstName"
          changeHandler={inputChangeHandler}
        />
      </div>

      <div className="m-loginForm__group">
        <AnimatedInput
          placeholder="Last Name"
          animateBorder
          inputType="text"
          inputName="lastName"
          changeHandler={inputChangeHandler}
        />
      </div>

      <div className="m-loginForm__group">
        <AnimatedInput
          placeholder="Username"
          animateBorder
          inputType="text"
          inputName="username"
          required
          changeHandler={inputChangeHandler}
        />
      </div>

      <div className="m-loginForm__group">
        <AnimatedInput
          placeholder="Password"
          animateBorder
          inputType="password"
          inputName="password"
          required
          changeHandler={inputChangeHandler}
        />
      </div>

      <button type="submit" className="a-submitButton">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
