import React, { useEffect, useState, Fragment } from "react";

import { connect } from "react-redux";

import { login } from "../../../store/user/actions";
import Loading from "../../../Components/common/Loading/Loading";

const Login = ({ authLogin, history, user }) => {
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

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const { username, password } = input;

    authLogin(username, password, history);
  };

  const content = loading ? (
    <Loading />
  ) : (
    <form onSubmit={formSubmitHandler}>
      <div className="inner-container">
        <h1 className="header">Login</h1>
        <div className="form-input">
          <label htmlFor="username" className="form-label">
            <span className="form-label-text">Username: </span>
            <input
              onChange={inputChangeHandler}
              className="form-text form-label-input"
              placeholder="Enter Your username"
              id="username"
              type="text"
              name="username"
              required
            />
          </label>
        </div>
        <div className="form-input">
          <label htmlFor="password" className="form-label">
            <span className="form-label-text">Password: </span>
            <input
              onChange={inputChangeHandler}
              placeholder="Enter your password"
              className="form-text"
              id="password"
              type="password"
              name="password"
              required
            />
          </label>
        </div>
        <input className="button" type="submit" value="LOGIN" />
      </div>
    </form>
  );

  return <Fragment>{content}</Fragment>;
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
