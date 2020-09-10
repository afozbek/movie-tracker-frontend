import React, { useState } from "react";

import { connect } from "react-redux";

import { register } from "../../../store/user/actions";

import RegisterForm from "./../../../Components/Auth/RegisterForm";

const Register = ({ authRegister, history }) => {
  const initialInput = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    message: "",
    confirm: false,
  };

  const [input, setInput] = useState(initialInput);

  const inputChangeHandler = (e) => {
    let inputName = e.target.name;
    let value = e.target.value;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [inputName]: value,
      };
    });
  };

  const confirmChangeHandler = (e) => {
    let checked = e.target.checked;
    let name = e.target.name;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: checked,
      };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, password, confirm } = input;

    const responseData = {
      firstName,
      lastName,
      username,
      password,
      authorities: confirm ? ["ROLE_ADMIN", "ROLE_USER"] : ["ROLE_USER"],
    };

    authRegister(responseData, history);
  };

  return (
    <>
      <div className="m-flexContainer">
        <div className="a-heroImage"></div>

        <div className="m-formContainer">
          <RegisterForm
            inputChangeHandler={inputChangeHandler}
            formSubmitHandler={formSubmitHandler}
            confirmChangeHandler={confirmChangeHandler}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authRegister: (userData, history) => {
    dispatch(register(userData, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
