import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RegisterForm from "./Components/Auth/RegisterForm/RegisterForm";
import Navbar from "./Components/Navbar";
import LoginForm from "./Components/Auth/LoginForm/LoginForm";
import Users from "./Components/Users/Users";
import Movies from "./Components/Movies/Movies";
import Directors from "./Components/Directors/Directors";
import UpdateUser from "./Components/Users/UpdateUser";
import UpdateMovie from "./Components/Movies/UpdateMovie";
import UpdateDirector from "./Components/Directors/UpdateDirector";
import Logout from "./Components/Auth/Logout/Logout";
import AddMovie from "./Components/Movies/AddMovie";
import AddUser from "./Components/Users/AddUser";
import AddDirector from "./Components/Directors/AddDirector";
import DeleteMovie from "./Components/Movies/DeleteMovie";
import DeleteMovieConfirm from "./Components/Movies/DeleteMovieConfirm";
import DeleteUser from "./Components/Users/DeleteUser";
import DeleteUserConfirm from "./Components/Users/DeleteUserConfirm";
import DeleteDirector from "./Components/Directors/DeleteDirector";
import DeleteDirectorConfirm from "./Components/Directors/DeleteDirectorConfirm";
import MustAddDirector from "./Components/Movies/MustAddDirector";
import FavList from "./Components/Users/FavLists/FavLists";
import WatchList from "./Components/Users/WatchList/WatchList";
import DirectorMovies from "./Components/Directors/DirectorMovies/DirectorMovies";
import Home from "./Components/Home";

const AppRouter = props => {
    return (
        <Router>
            <div className="table-app">
                <Navbar {...props} />
                <Switch>
                    <Route path="/login" exact component={LoginForm} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/register" exact component={RegisterForm} />

                    {/* USERS */}
                    <Route path="/users" exact component={Users} />
                    <Route
                        path="/update-user/:username"
                        exact
                        component={UpdateUser}
                    />
                    <Route
                        path="/delete-user/:userId"
                        exact
                        component={DeleteUser}
                    />
                    <Route
                        path="/delete-user-confirm/:username"
                        exact
                        component={DeleteUserConfirm}
                    />
                    <Route path="/add-user" exact component={AddUser} />

                    {/* MOVIES */}
                    <Route path="/movies" exact component={Movies} />
                    <Route
                        path="/update-movie/:movieId"
                        exact
                        component={UpdateMovie}
                    />
                    <Route
                        path="/delete-movie-confirm/:movieId"
                        exact
                        component={DeleteMovieConfirm}
                    />
                    <Route
                        path="/delete-movie/:movieId"
                        exact
                        component={DeleteMovie}
                    />
                    <Route path="/add-movie" exact component={AddMovie} />
                    <Route
                        path="/must-add-director"
                        exact
                        component={MustAddDirector}
                    />

                    {/* DIRECTORS */}
                    <Route path="/directors" exact component={Directors} />
                    <Route
                        path="/update-director/:directorId"
                        exact
                        component={UpdateDirector}
                    />
                    <Route
                        path="/delete-director/:directorId"
                        exact
                        component={DeleteDirector}
                    />
                    <Route
                        path="/delete-director-confirm/:directorId"
                        exact
                        component={DeleteDirectorConfirm}
                    />
                    <Route path="/add-director" exact component={AddDirector} />
                    <Route path="/favlist" exact component={FavList} />
                    <Route
                        path="/directorMovies/:directorId"
                        exact
                        component={DirectorMovies}
                    />
                    {/* ----- */}
                    <Route path="/watchlist" exact component={WatchList} />
                    <Route path="/" exact component={Home} />
                </Switch>
            </div>
        </Router>
    );
};

export default AppRouter;
