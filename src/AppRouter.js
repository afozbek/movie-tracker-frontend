import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./views/Auth/Register/Register";
import Login from "./views/Auth/Login/Login";
import Logout from "./views/Auth/Logout/Logout";

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
          {/* MOVIES */}
          <Route path="/movie/:movieId" exact component={Movie} />
          {/* DIRECTORS */}
          {/* ----- */}
          <Route path="/" exact component={Home} />
        </Switch>
      </div>

      {/* Footer */}
    </Router>
  );
};

export default AppRouter;
