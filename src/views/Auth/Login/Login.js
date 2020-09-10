import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import { login } from "../../../store/user/actions";
import Loading from "../../../Components/common/Loading/Loading";
import LoginForm from "../../../Components/Auth/LoginForm";

const Login = ({ authLogin, history }) => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState({ username: "", password: "" });

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

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const { username, password } = input;

    authLogin(username, password, history);
  };

  const content = loading ? (
    <Loading />
  ) : (
    <div className="m-flexContainer">
      <div className="a-heroImage"></div>

      <div className="m-formContainer">
        <LoginForm
          inputChangeHandler={inputChangeHandler}
          formSubmitHandler={formSubmitHandler}
        />
      </div>
    </div>
  );

  return <>{content}</>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  authLogin: (username, password, history) => {
    dispatch(login(username, password, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
