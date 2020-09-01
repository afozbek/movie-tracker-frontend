import React from "react";

const Logout = () => {
  const logoutHandler = (e) => {
    localStorage.removeItem("jwttoken");
    this.props.history.push("/login");
  };

  return (
    <button className="button abs-button" onClick={logoutHandler}>
      LOG OUT
    </button>
  );
};

export default Logout;
