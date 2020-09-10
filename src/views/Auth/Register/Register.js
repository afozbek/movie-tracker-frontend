import React, { useState } from "react";
import axios from "axios";
import RegisterForm from "./../../../Components/Auth/RegisterForm";

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

export default Register;
