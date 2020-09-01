import { Link } from "react-router-dom";
import React from "react";

const Navbar = (props) => {
  return (
    <>
      <ul className="m-header__navbar">
        {/* <li className="m-header__navItem">
          <Link to="/">Home</Link>
        </li>
        <li className="m-header__navItem">
          <Link to="/users">Users</Link>
        </li>
        <li className="m-header__navItem">
          <Link to="/movies">Movies</Link>
        </li>
        <li className="m-header__navItem">
          <Link to="/directors">Directors</Link>
        </li>
        <li className="m-header__navItem">
          <Link to="/favlist">Your FavList</Link>
        </li>
        <li className="m-header__navItem">
          <Link to="/watchlist">Your WatchList</Link>
        </li> */}

        <li className="m-header__navItem">
          <Link to="/login">Login</Link>
        </li>
        <li className="m-header__navItem">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
