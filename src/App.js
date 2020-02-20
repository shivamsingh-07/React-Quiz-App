import React, { Component } from "react";
import Main from "./Client/main";
// import Dashboard from "./Client/dashboard";

require("dotenv").config();

class App extends Component {
  render() {
    return <Main />;
  }
}

export default App;
