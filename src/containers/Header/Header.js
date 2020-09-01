import React from "react";

import Navbar from "./Navbar";

import "./Header.scss";

const Header = (props) => {
  return (
    <header className="m-header">
      <Navbar {...props} />
    </header>
  );
};
export default Header;
