import React, { useState, Fragment } from "react";
import axios from "axios";

const Register = (props) => {
  const initialInput = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    message: "",
    confirm: false,
  };

  const [message, setMessage] = useState("");
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

    axios
      .post("http://localhost:8080/auth/register", responseData)
      .then((res) => {
        setMessage(res.data.username + " successfully registered 😊");

        props.history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  };

  return (
    <Fragment>
      <form className="form" onSubmit={formSubmitHandler}>
        <div className="inner-container">
          <h1 className="header">Register Page</h1>
          <div className="form-input">
            <label htmlFor="firstName" className="form-label">
              <span className="form-label-text">Firstname :</span>
              <input
                onChange={inputChangeHandler}
                className="form-text form-label-input"
                id="firstName"
                type="text"
                name="firstName"
                required
              />
            </label>
          </div>
          <div className="form-input">
            <label htmlFor="lastName" className="form-label">
              <span className="form-label-text">Lastname:</span>
              <input
                onChange={inputChangeHandler}
                className="form-text form-label-input"
                id="lastName"
                type="text"
                name="lastName"
                required
              />
            </label>
          </div>
          <div className="form-input">
            <label htmlFor="username" className="form-label">
              <span className="form-label-text">Username:</span>
              <input
                onChange={inputChangeHandler}
                className="form-text form-label-input"
                id="username"
                type="text"
                name="username"
                required
              />
            </label>
          </div>

          <div className="form-input">
            <label htmlFor="password" className="form-label">
              <span className="form-label-text">Password:</span>
              <input
                onChange={inputChangeHandler}
                className="form-text"
                id="password"
                type="password"
                name="password"
                required
              />
            </label>
          </div>

          <div className="form-input">
            <label htmlFor="confirm" className="form-label">
              <span className="form-label-text">Are you an admin:</span>
              <input
                onChange={confirmChangeHandler}
                className="form-text"
                id="confirm"
                type="checkbox"
                name="confirm"
              />
            </label>
          </div>

          <h2>{message}</h2>
          <input className="button" type="submit" value="REGISTER" />
        </div>
      </form>
    </Fragment>
  );
};

export default Register;
