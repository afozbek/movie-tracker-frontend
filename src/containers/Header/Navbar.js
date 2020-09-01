import { Link, useHistory } from "react-router-dom";
import React from "react";

import { connect } from "react-redux";
import { logoutHandler } from "../../store/user/actions";

const Navbar = ({ user, logoutHandler }) => {
  const history = useHistory();

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
        {!user.authenticated ? (
          <>
            <li className="m-header__navItem">
              <Link to="/login">Login</Link>
            </li>
            <li className="m-header__navItem">
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li className="m-header__navItem">
            <button onClick={() => logoutHandler(history)}>Logout</button>
          </li>
        )}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  logoutHandler: (history) => dispatch(logoutHandler(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
