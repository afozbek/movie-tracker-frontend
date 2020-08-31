import React from "react";

import "./App.css";
import AppRouter from "./AppRouter";

class App extends React.Component {
  render() {
    return <AppRouter {...this.props} />;
  }
}

export default App;
