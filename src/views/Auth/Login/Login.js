import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios-instance";

import Loading from "../../../components/common/Loading/Loading";

const Login = (props) => {
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

    setLoading(true);

    axios
      .post("/auth/login", { username, password })
      .then((res) => {
        localStorage.setItem("jwttoken", res.data.token);
        localStorage.setItem("username", res.data.username);

        setLoading(false);

        props.history.push("/users");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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

  return (
    <Fragment>
      <Link to="/register">To Register</Link>
      <Link to="/">Home Page</Link>
      {content}
    </Fragment>
  );
};

export default Login;
