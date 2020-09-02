import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./views/Auth/Register/Register";
import Login from "./views/Auth/Login/Login";
import Users from "./views/Users/Users";
import Movies from "./views/Movies/Movies";
import Directors from "./views/Directors/Directors";
import UpdateUser from "./views/Users/UpdateUser";
import UpdateMovie from "./views/Movies/UpdateMovie";
import UpdateDirector from "./views/Directors/UpdateDirector";
import Logout from "./views/Auth/Logout/Logout";
import AddMovie from "./views/Movies/AddMovie";
import AddUser from "./views/Users/AddUser";
import AddDirector from "./views/Directors/AddDirector";
import DeleteMovie from "./views/Movies/DeleteMovie";
import DeleteMovieConfirm from "./views/Movies/DeleteMovieConfirm";
import DeleteUser from "./views/Users/DeleteUser";
import DeleteUserConfirm from "./views/Users/DeleteUserConfirm";
import DeleteDirector from "./views/Directors/DeleteDirector";
import DeleteDirectorConfirm from "./views/Directors/DeleteDirectorConfirm";
import MustAddDirector from "./views/Movies/MustAddDirector";
import FavList from "./views/Users/FavLists/FavLists";
import WatchList from "./views/Users/WatchList/WatchList";
import DirectorMovies from "./views/Directors/DirectorMovies/DirectorMovies";
import Home from "./views/Home/Home";
import Header from "./containers/Header/Header";
import Movie from "./views/NewMovies/Movie";

const AppRouter = (props) => {
  return (
    <Router>
      {/* Header */}
      <Header {...props} />

      {/* Views */}
      <div className="m-container">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/register" exact component={Register} />

          {/* USERS */}
          <Route path="/users" exact component={Users} />
          <Route path="/update-user/:username" exact component={UpdateUser} />
          <Route path="/delete-user/:userId" exact component={DeleteUser} />
          <Route
            path="/delete-user-confirm/:username"
            exact
            component={DeleteUserConfirm}
          />
          <Route path="/add-user" exact component={AddUser} />

          {/* MOVIES */}
          <Route path="/movies" exact component={Movies} />
          <Route path="/movie/:movieId" exact component={Movie} />
          <Route path="/update-movie/:movieId" exact component={UpdateMovie} />
          <Route
            path="/delete-movie-confirm/:movieId"
            exact
            component={DeleteMovieConfirm}
          />
          <Route path="/delete-movie/:movieId" exact component={DeleteMovie} />
          <Route path="/add-movie" exact component={AddMovie} />
          <Route path="/must-add-director" exact component={MustAddDirector} />

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

      {/* Footer */}
    </Router>
  );
};

export default AppRouter;
