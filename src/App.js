import React from "react";

import "./main.scss";
import AppRouter from "./AppRouter";

class App extends React.Component {
  render() {
    return <AppRouter {...this.props} />;
  }
}

export default App;
