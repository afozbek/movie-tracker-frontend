import { Link } from "react-router-dom";
import React from "react";

const Home = props => {
    return (
        <>
            <ul className="navbar">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/users">Users</Link>
                </li>
                <li className="nav-item">
                    <Link to="/movies">Movies</Link>
                </li>
                <li className="nav-item">
                    <Link to="/directors">Directors</Link>
                </li>
                <li className="nav-item">
                    <Link to="/favlist">Your FavList</Link>
                </li>
                <li className="nav-item">
                    <Link to="/watchlist">Your WatchList</Link>
                </li>

                <li className="nav-item">
                    <Link to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </>
    );
};

export default Home;
